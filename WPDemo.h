//
//  WPDemo.h
//  WordPress
//
//  Created by Jorge Bernal on 9/25/12.
//  Copyright (c) 2012 WordPress. All rights reserved.
//

#ifndef __WPDEMO_H
#define __WPDEMO_H

#define WPDEMO_USERNAME @"iosdemo"

void WPDEMO_ONLY(void (^demoBlock)(void), void (^regularBlock)(void));

void WPDEMO_FEATURE_UNAVAILABLE(void (^regularBlock)(void));

#ifdef WPDEMO
#define WPDEMO_RETURN(val) return val;
#else
#define WPDEMO_RETURN(val)
#endif

#endif