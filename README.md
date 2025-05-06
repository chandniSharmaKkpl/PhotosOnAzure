For the Network error in Android & Token error in iOS while uploading the image comment following: 

Android: 
MainApplication.java => Find and comment below line
//initializeFlipper(this, getReactNativeHost().getReactInstanceManager()); 

iOS: 
pods => Development pods => React-RCTImage => RCTImageLoader.mm 
Find this line __block RCTImageLoaderCancellationBlock requestToken  
replace that line with this: __block RCTImageLoaderCancellationBlock requestToken  = ^{};
Also add requestToken = ^{}; before retuen the token

Also do the same with below file: 
node_modules => react-native => Libraries => Image => RCTImageLoader.mm 
do the same as above step with the file 

FYI   Its keystore file password is  2excel@1234
Client a.c Pwd:  ofv1234Keystorefile name is ofv1234 keystone file name is onlinePwd : 123456 - old pwd in 2excel a/cKey: key0 Password same for both in key section
online1234 

