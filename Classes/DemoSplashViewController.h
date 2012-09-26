//
//  DemoSplashViewController.h
//  WordPress
//
//  Created by Dan Roundhill on 9/26/12.
//  Copyright (c) 2012 WordPress. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface DemoSplashViewController : UIViewController {
}

@property (nonatomic, strong) IBOutlet UIView *labelView;
@property (nonatomic, strong) IBOutlet UILabel *demoMessageLabel;
@property (nonatomic, strong) IBOutlet UIImageView *backgroundImage;

- (void)updateBackgroundImage:(UIInterfaceOrientation)toInterfaceOrientation;

@end
