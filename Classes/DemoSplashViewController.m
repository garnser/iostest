//
//  DemoSplashViewController.m
//  WordPress
//
//  Created by Dan Roundhill on 9/26/12.
//  Copyright (c) 2012 WordPress. All rights reserved.
//

#import "DemoSplashViewController.h"

@interface DemoSplashViewController ()

@end

@implementation DemoSplashViewController

@synthesize demoMessageLabel;

- (id)initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil
{
    self = [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil];
    if (self) {
        // Custom initialization
    }
    return self;
}

- (void)viewDidLoad
{
    [super viewDidLoad];
    [demoMessageLabel setText:NSLocalizedString(@"This version of WordPress was created specifically for demonstration purposes.", @"Demo app splash screen text")];
}

- (void)viewDidUnload
{
    [super viewDidUnload];
    // Release any retained subviews of the main view.
    // e.g. self.myOutlet = nil;
}

- (void)dealloc {
    demoMessageLabel = nil;
    [super dealloc];
}

- (BOOL)shouldAutorotateToInterfaceOrientation:(UIInterfaceOrientation)interfaceOrientation
{
    return (interfaceOrientation == UIInterfaceOrientationPortrait);
}

@end
