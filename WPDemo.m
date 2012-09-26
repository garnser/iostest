//
//  WPDemo.m
//  WordPress
//
//  Created by Jorge Bernal on 9/25/12.
//  Copyright (c) 2012 WordPress. All rights reserved.
//

void WPDEMO_ONLY(void (^demoBlock)(void), void (^regularBlock)(void)) {
#ifdef WPDEMO
        demoBlock();
#else
    if (regularBlock) {
            regularBlock();
        }
#endif
}

void WPDEMO_FEATURE_UNAVAILABLE(void (^regularBlock)(void)) {
    WPDEMO_ONLY(^{
        [[NSNotificationCenter defaultCenter] postNotificationName:kFeatureNotAvailableNotification object:nil];
    }, regularBlock);
}