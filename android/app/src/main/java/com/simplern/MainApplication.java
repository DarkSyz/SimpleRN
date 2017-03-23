package com.simplern;

import android.app.Application;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import java.util.*;

import com.flurry.android.Constants;
import com.flurry.android.FlurryAgent;

public class MainApplication extends Application implements ReactApplication {
  private final String DARK_API_KEY = "BWPNH33X5KMJ4JS52QQP";  // test RN android project
  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    protected boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
          new MyCustomPackage()
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
    
    new FlurryAgent.Builder()
       .withLogEnabled(true)
       .build(this, DARK_API_KEY);
  }
}
