package com.simplern;

import com.facebook.react.bridge.*;
import java.util.*;

public class MyCustomModule extends ReactContextBaseJavaModule {
    public MyCustomModule(ReactApplicationContext reactContext){
        super(reactContext);
    }
    @Override
    public String getName() {
        return "MyCustomModule";
    }
    @Override 
    public Map<String,Object> getConstants(){
        return new HashMap<>();
    } 
    @ReactMethod
    public void processString(String input, Callback callback){
        callback.invoke(input.replace("Goodbye", "Hello"));
    }
}