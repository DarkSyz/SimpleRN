import React, { Component } from 'react';
import { Navigator, Modal, View, ListView, Text, TouchableOpacity, TouchableHighlight, Alert, Image } from 'react-native';
import { Styles } from './styles';
import WEBAPI from './webapi';

export class Root extends Component {
    render = () => {
        return (
            <Navigator
                initialRoute={{name:'Home', component:Home}}
                renderScene={(route, navigator)=>
                    <route.component navigator={navigator}/>
                }
                configureScene={(route,routeStack)=>Navigator.SceneConfigs.HorizontalSwipeJump}
                />
        );
    }
}

export class NavigationBar extends Component {
    static propTypes = {
        title: React.PropTypes.string,
        leftButtonText: React.PropTypes.string,
        onLeftButtonPressed: React.PropTypes.func,
        rightButtonText: React.PropTypes.string,
        onRightButtonPressed: React.PropTypes.func,
    }
    render = () => {
        return (
            <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
                <TouchableOpacity style={Styles.navButton} onPress={
                        ()=>this.props.onLeftButtonPressed()
                    }>
                    <Text style={Styles.navButtonText}>{this.props.leftButtonText}</Text>
                </TouchableOpacity>  
                <Text style={Styles.navTitleText}>{this.props.title}</Text> 
                <TouchableOpacity style={Styles.navButton} onPress={
                        ()=>this.props.onLeftButtonPressed()
                    }>
                    <Text style={Styles.navButtonText}>{this.props.rightButtonText}</Text>
                </TouchableOpacity>               
            </View>
        );
    }
}

export class Home extends Component {
    render = () => {
        return (
            <View style={Styles.topContainer}>
                <TouchableHighlight underlayColor='crimson' style={Styles.button} onPress={
                        ()=>alert('Alert', 'Discard the changes?', [{text:'Yes'}, {text:'No'}])
                    }>
                    <Text style={Styles.content}>Alert</Text>
                </TouchableHighlight>
                <TouchableHighlight underlayColor='crimson' style={Styles.button} onPress={
                        ()=>this.props.navigator.push({name: 'ListView', component: MyListView})
                    }>
                    <Text style={Styles.content}>ListView</Text>
                </TouchableHighlight>
                <TouchableHighlight underlayColor='crimson' style={Styles.button} onPress={
                        ()=>this.props.navigator.push({name: 'ModalView', component: MyModalView})
                    }>
                    <Text style={Styles.content}>Model View</Text>
                </TouchableHighlight>                
            </View>
        );
    }
}

export class MyListView extends Component {
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
    render = () => {
        return (
            <View  style={Styles.topContainer}>
                <NavigationBar navigator={this.props.navigator} title='Models'
                    leftButtonText={'Back'}
                    rightButtonText={'Done'}
                    onLeftButtonPressed={()=>this.props.navigator.pop()}
                    onRightButtonPressed={()=>this.props.navigator.pop()}
                />
                <ListView style={{flex:1}}
                dataSource={this.state.dataSource}
                renderRow={(rowData)=>
                    <View flexDirection='row' alignItems='center' style={{height:40}}>
                        <Image style={{height:24, width:24}} source={require('../images/ic_launcher.png')}/>
                        <View style={{padding:4, flex:1}} flexDirection='column'>
                            <Text numberOfLines={1} style={Styles.title}>{rowData.modelName}</Text>
                            <Text numberOfLines={1} style={Styles.subTitle}>{rowData.vendorName}</Text>
                        </View>
                    </View>
                }
                renderSeparator={(sectionId, rowId)=><View key={rowId} style={{backgroundColor:'#CCCCCC', height:1}}/>}
                />
            </View>
        );
    }
    _fetchData = () =>{
        WEBAPI.fetchModels()
        .then((response)=>response.json())
        .then((json)=>{
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
            console.log(error);
        });
    }
}

export class MyModalView extends Component {
    constructor(props){
        super(props);
        this.state = { modalVisible: false };
    }
    setModalVisible = (visible) => {
        this.setState({ modalVisible: visible});
    }
    render = () => {
        return (
            <View style={Styles.topContainer}>
                <Modal
                    animationType={'slide'}
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={()=>{alert('1');}}>
                    <View style={{marginTop:15}}>
                        <NavigationBar navigator={this.props.navigator} title='Modal View'
                            leftButtonText={'Cancel'}
                            rightButtonText={'Done'}
                            onLeftButtonPressed={()=>this.setModalVisible(false)}
                            onRightButtonPressed={()=>this.setModalVisible(false)}
                        />
                        <TouchableHighlight underlayColor='crimson' style={Styles.button} onPress={
                            ()=>this.setModalVisible(false)
                            }>
                            <Text style={Styles.content}>Hide Modal View</Text>
                        </TouchableHighlight> 
                    </View>
                </Modal>
                <TouchableHighlight underlayColor='crimson' style={Styles.button} onPress={
                    ()=>this.setModalVisible(true)
                    }>
                    <Text style={Styles.content}>Show Modal View</Text>
                </TouchableHighlight> 
            </View>            
        );
    }
}


