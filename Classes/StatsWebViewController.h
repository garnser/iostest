//
//  StatsWebViewController.h
//
//  Created by Eric Johnson on 5/31/12.
//

#import "WPChromelessWebViewController.h"

@class Blog;

#define kSelectedBlogChanged @"kSelectedBlogChanged"

@interface StatsWebViewController : WPChromelessWebViewController <NSXMLParserDelegate, UIAlertViewDelegate> {
    NSMutableString *currentNode;
    NSMutableDictionary *parsedBlog;
    Blog *blog;
    BOOL authed;
}

@property (nonatomic, retain) Blog *blog;
@property (nonatomic, retain) NSMutableString *currentNode;
@property (nonatomic, retain) NSMutableDictionary *parsedBlog;

- (void)setBlog:(Blog *)blog;

- (void)initStats;
- (void)getUserAPIKey;
- (void)promptForCredentials;
- (void)authStats;
- (void)loadStats;
- (NSString *)percentEscapeString: (NSString *)string;

@end
