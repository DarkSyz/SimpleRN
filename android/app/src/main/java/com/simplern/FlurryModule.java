package com.simplern;

import android.content.Context;
import com.facebook.react.bridge.*;
import java.util.*;
import com.flurry.android.FlurryAgent;
import com.flurry.android.FlurryEventRecordStatus;

public class FlurryModule extends ReactContextBaseJavaModule {
    /**
     * eyJhbGciOiJIUzI1NiIsImtpZCI6ImZsdXJyeS56dXVsLnByb2Qua2V5c3RvcmUua2V5LjEifQ.eyJpc3MiOiJodHRwczovL3p1dWwuZmx1cnJ5LmNvbTo0NDMvdG9rZW4iLCJpYXQiOjE0OTAyNTA3NjcsImV4cCI6MzMwNDcxNTk1NjcsInN1YiI6IjM4NzU1MSIsImF1ZCI6IjQiLCJ0eXBlIjo0LCJqdGkiOiIxMDM5In0.qP9oPvM9JXcXaovn4OeGoS2eq3D4mZn3xqIaTQVCDis
     */
    public FlurryModule(ReactApplicationContext reactContext){
        super(reactContext);
    }
    @Override
    public String getName() {
        return "FlurryModule";
    }
    @Override 
    public Map<String,Object> getConstants(){
        return new HashMap<>();
    }
    
    /**
     * Flurry Methods     
     */
    @ReactMethod
    public void logEvent(String eventName){
        FlurryAgent.logEvent(eventName);
    }
    @ReactMethod
    public void logEventWithParams(String eventName, ReadableMap params){
        Map map = ((ReadableNativeMap)params).toHashMap();
        FlurryAgent.logEvent(eventName, map);
    }
    /*
    @ReactMethod
    public void onError(String errorId, String message, Throwable exception){
        FlurryAgent.onError(errorId, message, exception);
    }

    @ReactMethod
    public void onPageView(){
        FlurryAgent.onPageView();
    }

    @ReactMethod
    public void setAge(int age){
        FlurryAgent.setAge(age);
    }
    @ReactMethod
    public void setGender(byte gender){
        FlurryAgent.setGender(gender);
    }
    @ReactMethod
    public void setUserId(String userId){
        FlurryAgent.setUserId(userId);
    }

    @ReactMethod
    public boolean isSessionActive(){
        return FlurryAgent.isSessionActive();
    }    
    @ReactMethod
    public String getSessionId(){
        return FlurryAgent.getSessionId();
    }    
    */
}