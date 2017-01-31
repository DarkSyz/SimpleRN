#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>
#import <React/RCTViewManager.h>
#import <React/RCTView.h>

@interface MyCustomView : RCTView <RCTBridgeModule>
@property(nonatomic) UIColor *startColor;
@property(nonatomic) UIColor *endColor;
@end

@implementation MyCustomView
RCT_EXPORT_MODULE()

- (UIView *)view
{
  return [[MyCustomView alloc] init];
}

- (void)drawRect:(CGRect)rect
{
  [[UIColor redColor] setFill];
  UIRectFill([self bounds]);
}

RCT_EXPORT_VIEW_PROPERTY(startColor, NSNumber);
RCT_EXPORT_VIEW_PROPERTY(endColor, NSNumber);
@end

@interface MyCustomViewManager : RCTViewManager
@end

@implementation MyCustomViewManager
RCT_EXPORT_MODULE()

- (UIView *)view
{
  return [[MyCustomView alloc] init];
}

RCT_EXPORT_VIEW_PROPERTY(startColor, NSNumber);
RCT_EXPORT_VIEW_PROPERTY(endColor, NSNumber);
@end
