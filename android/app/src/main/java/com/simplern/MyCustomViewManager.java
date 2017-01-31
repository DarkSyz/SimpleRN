package com.simplern;

import com.facebook.react.uimanager.*;
import com.facebook.react.uimanager.annotations.ReactProp;

import javax.annotation.Nullable;

/**
 * Created by benc on 31/01/2017.
 */
public class MyCustomViewManager extends SimpleViewManager<MyCustomView> {
    @Override
    public String getName(){
        return "MyCustomView";
    }

    @Override
    protected MyCustomView createViewInstance(ThemedReactContext reactContext) {
        return new MyCustomView(reactContext);
    }

    @ReactProp(name = "startColor", customType = "Color")
    public void setStartColor(MyCustomView view, @Nullable Integer startColor) {
        view.setStartColor(startColor);
    }

    @ReactProp(name = "endColor", customType = "Color")
    public void setEndColor(MyCustomView view, @Nullable Integer endColor) {
        view.setEndColor(endColor);
    }
}

