//
//  WPDemo.h
//  WordPress
//
//  Created by Jorge Bernal on 9/25/12.
//  Copyright (c) 2012 WordPress. All rights reserved.
//

void WPDEMO_ONLY(void (^demoBlock)(void), void (^regularBlock)(void)) {
    if (getenv("WPDEMO")) {
        demoBlock();
    } else {
        regularBlock();
    }
}

void WPDEMO_FEATURE_UNAVAILABLE(void (^regularBlock)(void)) {
    WPDEMO_ONLY(^{
        [[NSNotificationCenter defaultCenter] postNotificationName:kFeatureNotAvailableNotification object:nil];
    }, regularBlock);
}

#define WPDEMO_RETURN(val) if (getenv("WPDEMO")) return val;