#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>
#import <React/RCTViewManager.h>
#import <React/RCTView.h>
#import <MapKit/MapKit.h>
#import <React/RCTLog.h>

#define UIColorFromHex(c) [UIColor colorWithRed:((c&0xFF000000)>>24)/255.0 \
                                  green:((c&0xFF0000)>>16)/255.0 \
                                  blue:((c&0xFF00)>>8)/255.0 \
                                  alpha:(c&0xFF)/255.0]

@interface MyCustomView : RCTView <RCTBridgeModule>
@property(nonatomic) int startColor;
@property(nonatomic) int endColor;
@property(nonatomic) NSString *text;
@property(nonatomic) UILabel *label;
@end

@implementation MyCustomView

RCT_EXPORT_MODULE()

-(void) setStartColor:(int)startColor
{
  self.label.textColor = UIColorFromHex(startColor);
}
-(void) setEndColor:(int)endColor
{
  self.label.backgroundColor = UIColorFromHex(endColor);
}
-(void) setText:(NSString*)text
{
  self.label.text = [NSString stringWithFormat:@"Hello, %@", text];
}

-(id) initWithFrame:(CGRect)frame
{
  self = [super initWithFrame:frame];
  if (nil != self)
  {
    self.label = [[UILabel alloc] init];
    [self addSubview:self.label];
  }
  return self;
}
-(void) layoutSubviews
{
  [super layoutSubviews];
  self.label.frame = self.bounds;
}
@end

@interface MyCustomViewManager : RCTViewManager
@end

@implementation MyCustomViewManager
RCT_EXPORT_MODULE()

- (UIView *)view
{
  return [[MyCustomView alloc] init];
}

RCT_EXPORT_VIEW_PROPERTY(startColor, int);
RCT_EXPORT_VIEW_PROPERTY(endColor, int);
RCT_EXPORT_VIEW_PROPERTY(text, NSString);
@end
