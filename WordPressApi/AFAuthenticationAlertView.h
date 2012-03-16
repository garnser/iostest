//
//  AFAuthenticationAlertView.h
//  WordPress
//
//  Created by Jorge Bernal on 3/15/12.
//  Copyright (c) 2012 WordPress. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "AFHTTPRequestOperation.h"

@interface AFAuthenticationAlertView : NSObject<UIAlertViewDelegate>
- (id)initWithProtectionSpace:(NSURLProtectionSpace *)protectionSpace operation:(AFHTTPRequestOperation *)operation andQueue:(NSOperationQueue *)queue;
- (void)show;
@end
