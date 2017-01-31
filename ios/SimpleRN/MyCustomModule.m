#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>
#import <React/RCTBridgeModule.h>
#import <React/RCTLog.h>

@interface MyCustomModule : NSObject <RCTBridgeModule>
@end

@implementation MyCustomModule
RCT_EXPORT_MODULE();
RCT_EXPORT_METHOD(processString:(NSString *)input callback:(RCTResponseSenderBlock)callback)
{
  RCTLogInfo(@"Pretending to run processString");
  callback(@[[input stringByReplacingOccurrencesOfString:@"Goodbye" withString:@"Hello"]]);
}
@end