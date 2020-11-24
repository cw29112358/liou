package com.globalmerchantsunion;

import android.app.Application;

import com.facebook.react.ReactApplication;
import fr.bamlab.rnimageresizer.ImageResizerPackage;
import com.imagepicker.ImagePickerPackage;
import io.jchat.android.JMessageReactPackage;
import com.brentvatne.react.ReactVideoPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.reactnative.ivpusic.imagepicker.PickerPackage;
import com.jeepeng.react.xgpush.PushPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import com.beefe.picker.PickerViewPackage;
import com.AlexanderZaytsev.RNI18n.RNI18nPackage;
import com.rnfs.RNFSPackage;
import ca.jaysoo.extradimensions.ExtraDimensionsPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.globalmerchantsunion.opensettings.*;
import io.jchat.android.JMessageReactPackage;
import cn.jiguang.imui.messagelist.ReactIMUIPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {
  private static final boolean SHUTDOWN_TOAST = false;

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
          new ImageResizerPackage(),
          new ImagePickerPackage(),
          new ReactVideoPackage(),
          new LinearGradientPackage(),
          new PickerPackage(),
          new PushPackage(),
          new VectorIconsPackage(),
          new SplashScreenReactPackage(),
          new PickerViewPackage(),
          new RNI18nPackage(),
          new RNFSPackage(),
          new ExtraDimensionsPackage(),
          new RNDeviceInfo(),
          new JMessageReactPackage(SHUTDOWN_TOAST),
          new OpenSettingsPackage(),
          new ReactIMUIPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index.android";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }
}
