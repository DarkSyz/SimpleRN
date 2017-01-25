import React, { Component } from 'react';
import { Platform, View, ListView, Text, TextInput, ActivityIndicator, TouchableOpacity, TouchableHighlight, Alert, Image } from 'react-native';
import { Scene, Router, TabBar, Modal, Schema, Actions, Reducer, ActionConst } from 'react-native-router-flux';
import { Styles } from './styles';
import WEBAPI from './webapi';
import LoadingSpinner from './spinner';
import Login from './login';
import TabIcon from './tabicon';


const getSceneStyle = (/* NavigationSceneRendererProps */ props, computedProps) => {
    const style = {
        flex: 1,
        backgroundColor: '#fff',
        shadowColor: null,
        shadowOffset: null,
        shadowOpacity: null,
        shadowRadius: null,
    };
    if (computedProps.isActive) {
        style.marginTop = computedProps.hideNavBar ? (Platform.OS==='android'?0:20) : (Platform.OS==='android'?54:64);
        style.marginBottom = computedProps.hideTabBar ? 0 : 50;
    }
    return style;
};
export class Root extends Component {
    render(){
        return (
            <Router scenes={scenes} getSceneStyle={getSceneStyle}/>
        );
    }
}

export class Home extends Component {
    static propTypes = {
        username: React.PropTypes.string.isRequired
    }
    render(){
        console.log(this.props.username);
        return (
            <View style={Styles.topContainer}>
                <Text>Welcome, {this.props.username}</Text>
            </View>
        );
    }
}

export class Favorites extends Component {
    constructor(props){
        super(props);

        var ds = new ListView.DataSource({rowHasChanged: (r1, r2)=>r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows([{key:-1, modelName: 'Loading Model Data...', vendorName:'Please wait for a while'}])
        };
    }
    componentDidMount(){
        this._fetchData();
    }

    render(){
        if ( this.state.dataSource.getRowCount() > 0 ){
            return (
            <View  style={Styles.topContainer}>
                <ListView style={{flex:1}} visible={this.state.dataSource.getRowCount()>0}
                dataSource={this.state.dataSource}
                renderRow={(rowData)=>
                    <View key={rowData.key} flexDirection='row' alignItems='center' style={{height:40}}>
                        <Image style={{height:24, width:24}} source={require('../images/ic_launcher.png')}/>
                        <View style={{padding:4, flex:1}} flexDirection='column'>
                            <Text numberOfLines={1} style={Styles.title}>{rowData.modelName}</Text>
                            <Text numberOfLines={1} style={Styles.subTitle}>{rowData.vendorName}</Text>
                        </View>
                    </View>
                }
                renderSeparator={(sectionId, rowId)=><View key={rowId} style={Styles.separator}/>}
                />
            </View>
            );                        
        } else {
            return (
            <View  style={Styles.topContainer}>
                <View style={Styles.emptyContainer}> 
                    <Text style={Styles.content}>No Favorite</Text>
                </View>
            </View>
            );
        }
    }
    _fetchData(){
        Actions.spinner({textContent: 'Loading...'});

        WEBAPI.fetchModels()
        .then((response)=>response.json())
        .then((json)=>{
            console.log(json);
            let data=[];
            let models = json.models;
            for ( let i = 0; i < models.length; i++ ){ 
                data.push({
                    key: models[i].Id,
                    modelName: models[i].sapModelName,
                    vendorName: models[i].vendor.standardizedName
                });
            }
            var ds = new ListView.DataSource({rowHasChanged: (r1, r2)=>r1 !== r2});
            this.setState({
                dataSource: ds.cloneWithRows(data)
            });
        })
        .catch((error)=>{
            var ds = new ListView.DataSource({rowHasChanged: (r1, r2)=>r1 !== r2});
            this.setState({
                dataSource: ds.cloneWithRows([])
            });            
            console.log(error);
            alert('Failed to load data');
        })
        .then(()=>Actions.pop());

    }
}

const brandingImage = () => {
    return (
        <View>
            <TouchableOpacity style={Styles.navButton} onPress={()=>{Actions.favorites();}}>
                <Image style={{height:24, width:24}} source={require('../images/ic_launcher.png')}/>
            </TouchableOpacity> 
        </View>
    );
};

const createNavButton = (text, callback) => {
    return (
        <View>
            <TouchableOpacity style={Styles.navButton} onPress={
                    ()=>callback()
                }>
                <Text style={Styles.navButtonText}>{text}</Text>
            </TouchableOpacity>            
        </View>
    );
};

// it must be defined after the referred components
const scenes = Actions.create(
    <Scene key='modal' component={Modal}>
        <Scene key='root' >
            <Scene key='login' component={Login} hideNavBar hideTabBar/>

            <Scene key='tabbar' type={ActionConst.RESET} tabs tabBarStyle={Styles.tabBarStyle}>
                <Scene key='home' component={Home} title='Home' icon={TabIcon} initial
                    /*onLeft={()=>{Actions.b();Actions.favorite();}}
                    leftTitle={'Favorite'}*/
                    renderLeftButton={brandingImage}
                    renderRightButton={(createSearchButton)=>createNavButton('Search', ()=>alert('Search Clicked'))}
                />
                <Scene key='favorites' component={Favorites} title='Favorites' icon={TabIcon} />
            </Scene>
        </Scene>

        <Scene key='spinner' component={LoadingSpinner} hideNavBar/>
    </Scene>    
);