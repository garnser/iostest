//
//  DemoSplashViewController.m
//  WordPress
//
//  Created by Dan Roundhill on 9/26/12.
//  Copyright (c) 2012 WordPress. All rights reserved.
//

#import "DemoSplashViewController.h"
#import <QuartzCore/QuartzCore.h>

@interface DemoSplashViewController ()

@end

@implementation DemoSplashViewController

@synthesize demoMessageLabel;
@synthesize backgroundImage;
@synthesize labelView;


- (void)dealloc {
    self.demoMessageLabel = nil;
    self.backgroundImage = nil;
    self.labelView = nil;
    
    [super dealloc];
}

- (void)viewDidLoad
{
    [super viewDidLoad];
    self.labelView.backgroundColor = [UIColor colorWithPatternImage:[UIImage imageNamed:@"welcome_bg_pattern.png"]];
    self.labelView.layer.cornerRadius = 10.0f;
    self.labelView.layer.masksToBounds = YES;
    

    [demoMessageLabel setText:NSLocalizedString(@"This version of WordPress was created specifically for demonstration purposes.", @"Demo app splash screen text")];
}

- (void)viewWillAppear:(BOOL)animated {
    [super viewWillAppear:animated];
    [self updateBackgroundImage:self.interfaceOrientation];
}

- (void)viewDidUnload
{
    [super viewDidUnload];
    self.demoMessageLabel = nil;
    self.backgroundImage = nil;
    self.labelView = nil;
}

- (void)didRotateFromInterfaceOrientation:(UIInterfaceOrientation)fromInterfaceOrientation {
    [self updateBackgroundImage:self.interfaceOrientation];
}

- (BOOL)shouldAutorotate {
    return NO;    
}

- (BOOL)shouldAutorotateToInterfaceOrientation:(UIInterfaceOrientation)interfaceOrientation
{
    if(IS_IPHONE) {
        return interfaceOrientation == UIInterfaceOrientationPortrait;
    }
    return [super shouldAutorotateToInterfaceOrientation:interfaceOrientation];
}


- (NSUInteger)supportedInterfaceOrientations {
    if(IS_IPHONE) {
        return UIInterfaceOrientationMaskPortrait;
    }
    return UIInterfaceOrientationMaskAll;
}

- (void)updateBackgroundImage:(UIInterfaceOrientation)toInterfaceOrientation {
    NSString *imgName = nil;
    
    if(IS_IPAD) {
        if(UIInterfaceOrientationIsPortrait(toInterfaceOrientation)) {
            imgName = @"Default-Portrait";
        } else {
            imgName = @"Default-Landscape";
        }
    } else {
        
        CGSize size = self.view.frame.size;
        if (size.width > 480.0 || size.height > 480.0) {
            imgName = @"Default-568h";
        } else {
            imgName = @"Default";
        }
    }
    [self.backgroundImage setImage:[UIImage imageNamed:imgName]];
}


@end
