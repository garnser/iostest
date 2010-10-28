//
//  StatsTableViewController.m
//  WordPress
//
//  Created by Dan Roundhill on 10/12/10.
//  Copyright 2010 WordPress. All rights reserved.
//

#import "StatsTableViewController.h"
#import "StatsTableCell.h"
#import "BlogDataManager.h"
#import "UITableViewActivityCell.h"
#import "WPcomLoginViewController.h"
#import "Reachability.h"


@implementation StatsTableViewController

@synthesize viewsData, postViewsData, referrersData, searchTermsData, clicksData, reportTitle, 
selectedIndexPath, currentBlog, statsData, currentProperty, rootTag, 
statsTableData, leftColumn, rightColumn, spinner, xArray, yArray, xValues, yValues, wpcomLoginTable, 
statsPageControlViewController, noDataError, refreshButtonItem;
#define LABEL_TAG 1 
#define VALUE_TAG 2 
#define FIRST_CELL_IDENTIFIER @"TrailItemCell" 
#define SECOND_CELL_IDENTIFIER @"RegularCell" 


- (void)viewDidLoad {
	self.tableView = [[UITableView alloc] initWithFrame:CGRectZero style:UITableViewStyleGrouped];
	self.view.frame = CGRectMake(0, 0, 320, 460);
	self.tableView.allowsSelection = NO;
	appDelegate = (WordPressAppDelegate *)[[UIApplication sharedApplication] delegate];
	
	//init the spinner
	spinner = [[WPProgressHUD alloc] initWithLabel:@"Retrieving stats..."];
	
	statsPageControlViewController = [[StatsPageControlViewController alloc] init];
	connectionToInfoMapping = CFDictionaryCreateMutable(
														kCFAllocatorDefault,
														0,
														&kCFTypeDictionaryKeyCallBacks,
														&kCFTypeDictionaryValueCallBacks);
	
	refreshButtonItem = [[UIBarButtonItem alloc] initWithBarButtonSystemItem:UIBarButtonSystemItemRefresh target:self action:@selector(initStats)];
}

- (void) viewWillAppear:(BOOL)animated {
	//set right navigation button item
	if([[Reachability sharedReachability] internetConnectionStatus] == NotReachable) {
		UIAlertView *errorView = [[UIAlertView alloc] 
								  initWithTitle: @"Communication Error" 
								  message: @"The internet connection appears to be offline." 
								  delegate: self 
								  cancelButtonTitle: @"OK" otherButtonTitles: nil];
		[errorView show];
		[errorView autorelease];
	}
	else
	{
		//get this party started!
		if (!canceledAPIKeyAlert && !foundStatsData)
			[self initStats]; 
	}
}

- (void)loadView {
    [super loadView];
    
	
}

-(void) initStats {
	
	BlogDataManager *dm = [BlogDataManager sharedDataManager];	
	
	NSString *apiKey = [dm.currentBlog valueForKey:@"api_key"];
	
	if (apiKey == nil){
		//first run or api key was deleted
		[self getUserAPIKey];
	}
	else {
		[spinner show];
		statsRequest = true;
		[self refreshStats: 0 reportInterval: 0];
	}
	
	
}

-(void)getUserAPIKey {
	if (appDelegate.isWPcomAuthenticated)
	{
		[spinner show];
		statsData = [[NSMutableData alloc] init];
		CFDictionaryAddValue(
							 connectionToInfoMapping,
							 [[NSURLConnection alloc] initWithRequest:[NSURLRequest requestWithURL:[NSURL URLWithString:@"https://public-api.wordpress.com/getuserblogs.php"]] delegate:self],
							 [NSMutableDictionary
							  dictionaryWithObject:[NSMutableData data]
							  forKey:@"apiKeyData"]);
		//[NSURLConnection sendSynchronousRequest:request returningResponse:nil error:nil];
	}
	else 
	{
		if(DeviceIsPad() == YES) {
			WPcomLoginViewController *wpComLogin = [[WPcomLoginViewController alloc] initWithNibName:@"WPcomLoginViewController-iPad" bundle:nil];	
			[self.navigationController pushViewController:wpComLogin animated:YES];
			[wpComLogin release];
		}
		else {
			WPcomLoginViewController *wpComLogin = [[WPcomLoginViewController alloc] initWithNibName:@"WPcomLoginViewController" bundle:nil];	
			[appDelegate.navigationController presentModalViewController:wpComLogin animated:YES];
			[wpComLogin release];
		}
		UIAlertView *alert = [[[UIAlertView alloc] initWithTitle:@"WordPress.com Stats" 
														 message:@"To load stats for your blog you will need to have the WordPress.com stats plugin installed and correctly configured." 
														delegate:self cancelButtonTitle:@"Learn More" otherButtonTitles:nil] autorelease];
		alert.tag = 1;
		[alert addButtonWithTitle:@"I'm Ready!"];
		[alert show];
		
	}
	
}

- (void) refreshStats: (int) titleIndex reportInterval: (int) intervalIndex {
	//load stats into NSMutableArray objects
	foundStatsData = FALSE;
	//[statsTableViewController.view setHidden:TRUE]; 
	if (noDataError.hidden == FALSE){
		[noDataError setHidden:TRUE];
	}
	int days;
	NSString *report = [[NSString alloc] init];
	NSString *period = [[NSString alloc] init];
	switch (intervalIndex) {
		case 0:
			days = 7;
			break;
		case 1:
			days = 30;
			break;
		case 2:
			days = 90;
			break;
		case 3:
			days = 365;
			break;
		case 4:
			days = -1;
			break;
	}
	
	if (days == 90){
		period = @"&period=week";
		days = 12;
	}
	else if (days == 365){
		period = @"&period=month";
		days = 11;
	}
	else if (days == -1){
		period = @"&period=month";
	}
	
	switch (titleIndex) {
		case 0:
			report = @"views";
			break;
		case 1:
			report = @"postviews";
			break;
		case 2:
			report = @"referrers";
			break;
		case 3:
			report = @"searchterms";
			break;
		case 4:
			report = @"clicks";
			break;
	}	
	BlogDataManager *dm = [BlogDataManager sharedDataManager];
	NSString *blogURL = [dm.currentBlog valueForKey:@"blog_host_name"];
	NSString *apiKey = [dm.currentBlog valueForKey:@"api_key"];
	
	//request the 5 reports for display in the UITableView
	
	NSString *requestURL = [[NSString alloc] init];
	NSMutableURLRequest *request = [[NSMutableURLRequest alloc] init];
	//views
	requestURL = [NSString stringWithFormat: @"http://stats.wordpress.com/csv.php?api_key=%@&blog_uri=%@&format=xml&table=%@&days=%d%@", apiKey, blogURL, @"views", 7, @""];	
	[request setURL:[NSURL URLWithString:requestURL]];
	CFDictionaryAddValue(
						 connectionToInfoMapping,
						 [[NSURLConnection alloc] initWithRequest:request delegate:self],
						 [NSMutableDictionary
						  dictionaryWithObject:[NSMutableData data]
						  forKey:@"viewsData"]);
	
	//postviews
	requestURL = [NSString stringWithFormat: @"http://stats.wordpress.com/csv.php?api_key=%@&blog_uri=%@&format=xml&table=%@&days=%d%@&summarize", apiKey, blogURL, @"postviews", 7, @""];	
	[request setURL:[NSURL URLWithString:requestURL]];
	CFDictionaryAddValue(
						 connectionToInfoMapping,
						 [[NSURLConnection alloc] initWithRequest:request delegate:self],
						 [NSMutableDictionary
						  dictionaryWithObject:[NSMutableData data]
						  forKey:@"postViewsData"]);
	
	//referrers
	requestURL = [NSString stringWithFormat: @"http://stats.wordpress.com/csv.php?api_key=%@&blog_uri=%@&format=xml&table=%@&days=%d%@&summarize", apiKey, blogURL, @"referrers", 7, @""];	
	[request setURL:[NSURL URLWithString:requestURL]];
	CFDictionaryAddValue(
						 connectionToInfoMapping,
						 [[NSURLConnection alloc] initWithRequest:request delegate:self],
						 [NSMutableDictionary
						  dictionaryWithObject:[NSMutableData data]
						  forKey:@"referrersData"]);
	
	//search terms
	requestURL = [NSString stringWithFormat: @"http://stats.wordpress.com/csv.php?api_key=%@&blog_uri=%@&format=xml&table=%@&days=%d%@&summarize", apiKey, blogURL, @"searchterms", 7, @""];	
	[request setURL:[NSURL URLWithString:requestURL]];
	CFDictionaryAddValue(
						 connectionToInfoMapping,
						 [[NSURLConnection alloc] initWithRequest:request delegate:self],
						 [NSMutableDictionary
						  dictionaryWithObject:[NSMutableData data]
						  forKey:@"searchTermsData"]);
	
	//clicks
	requestURL = [NSString stringWithFormat: @"http://stats.wordpress.com/csv.php?api_key=%@&blog_uri=%@&format=xml&table=%@&days=%d%@&summarize", apiKey, blogURL, @"clicks", 7, @""];	
	[request setURL:[NSURL URLWithString:requestURL]];
	CFDictionaryAddValue(
						 connectionToInfoMapping,
						 [[NSURLConnection alloc] initWithRequest:request delegate:self],
						 [NSMutableDictionary
						  dictionaryWithObject:[NSMutableData data]
						  forKey:@"clicksData"]);
	
	
	//get the three header chart images
	statsData = [[NSMutableData alloc] init];
	statsRequest = TRUE;
	
	// 7 days
	requestURL = [NSString stringWithFormat: @"http://stats.wordpress.com/csv.php?api_key=%@&blog_uri=%@&format=xml&table=%@&days=%d%@", apiKey, blogURL, @"views", 7, @""];	
	[request setURL:[NSURL URLWithString:requestURL]];
	CFDictionaryAddValue(
						 connectionToInfoMapping,
						 [[NSURLConnection alloc] initWithRequest:request delegate:self],
						 [NSMutableDictionary
						  dictionaryWithObject:[NSMutableData data]
						  forKey:@"chartDaysData"]);
	// 10 weeks
	requestURL = [NSString stringWithFormat: @"http://stats.wordpress.com/csv.php?api_key=%@&blog_uri=%@&format=xml&table=%@&days=%d%@", apiKey, blogURL, @"views", 10, @"&period=week"];	
	[request setURL:[NSURL URLWithString:requestURL]];
	CFDictionaryAddValue(
						 connectionToInfoMapping,
						 [[NSURLConnection alloc] initWithRequest:request delegate:self],
						 [NSMutableDictionary
						  dictionaryWithObject:[NSMutableData data]
						  forKey:@"chartWeeksData"]);
	// 12 months
	requestURL = [NSString stringWithFormat: @"http://stats.wordpress.com/csv.php?api_key=%@&blog_uri=%@&format=xml&table=%@&days=%d%@", apiKey, blogURL, @"views", 11, @"&period=month"];	
	[request setURL:[NSURL URLWithString:requestURL]];
	[request setValue:@"wp-iphone" forHTTPHeaderField:@"User-Agent"];
	CFDictionaryAddValue(
						 connectionToInfoMapping,
						 [[NSURLConnection alloc] initWithRequest:request delegate:self],
						 [NSMutableDictionary
						  dictionaryWithObject:[NSMutableData data]
						  forKey:@"chartMonthsData"]);
	[request release];
	statsRequest = TRUE;
}

- (void) startParsingStats: (NSString*) xmlString withReportType: (NSString*) reportType {
	statsTableData = nil;
	statsTableData = [[NSMutableArray alloc] init];
	self.tableView.tableHeaderView = statsPageControlViewController.view;
	xArray = [[NSMutableArray alloc] init];
	yArray = [[NSMutableArray alloc] init];
	NSData *data = [xmlString dataUsingEncoding:NSUTF8StringEncoding];
	NSXMLParser *statsParser = [[NSXMLParser alloc] initWithData:data];
	statsParser.delegate = self;
	[statsParser parse];
	[statsParser release];
	if ([xArray count] > 0){
		//set up the new data in the UI
		foundStatsData = TRUE;
		if ([reportType isEqualToString:@"chartDaysData"] || [reportType isEqualToString:@"chartWeeksData"] || [reportType isEqualToString:@"chartMonthsData"]){
			[spinner dismiss];
			NSString *chartViewURL = [[NSString alloc] init];
			NSString *xValues = [xArray componentsJoinedByString:@","];
			NSArray *sorted = [xArray sortedArrayUsingSelector:@selector(compare:)];
			
			//calculate some variables for the google chart
			int minValue = [[sorted objectAtIndex:0] intValue];
			int maxValue = [[sorted objectAtIndex:[sorted count] - 1] intValue];
			int minBuffer = round(minValue - (maxValue * .10));
			if (minBuffer < 0){
				minBuffer = 0;
			}
			int maxBuffer = round(maxValue + (maxValue * .10));
			//round to the lowest 10 for prettier charts
			for(int i = 0; i < 9; i++) {
				if(minBuffer % 10 == 0)
					break;
				else{
					minBuffer--;
				}
			}
			
			for(int i = 0; i < 9; i++) {
				if(maxBuffer % 10 == 0)
					break;
				else{
					maxBuffer++;
				}
			}
			
			int yInterval = maxBuffer / 10;
			//round the gap in y axis of the chart
			for(int i = 0; i < 9; i++) {
				if(yInterval % 10 == 0)
					break;
				else{
					yInterval++;
				}
			}
			
			NSMutableArray *dateCSV = [[NSMutableArray alloc] init];
			NSDateFormatter *df = [[NSDateFormatter alloc] init];
			NSString *dateValues = [[NSString alloc] initWithString: @""];
			NSString *tempString = [[NSString alloc] initWithString: @""];
			if ([reportType isEqualToString:@"chartDaysData"]){
				
				for (NSString *dateVal in yArray) {
					[df setDateFormat:@"yyyy-MM-dd"];
					NSDate *tempDate = [df dateFromString: dateVal];
					tempString =[tempDate descriptionWithCalendarFormat:@"%w" timeZone:nil locale:nil];
					if ([tempString isEqualToString:@"0"] || [tempString isEqualToString:@"6"]){
						tempString = @"S";
					}
					else if ([tempString isEqualToString:@"1"]){
						tempString = @"M";
					}
					else if ([tempString isEqualToString:@"2"] || [tempString isEqualToString:@"4"]){
						tempString = @"T";
					}
					else if ([tempString isEqualToString:@"3"]){
						tempString = @"W";
					}
					else if ([tempString isEqualToString:@"5"]){
						tempString = @"F";
					}
					
					[dateCSV addObject: tempString];
				}
			}
			else if ([reportType isEqualToString:@"chartWeeksData"])
			{
				for (NSString *dateVal in yArray) {
					[dateCSV addObject: [dateVal substringWithRange: NSMakeRange (5, 2)]];
				}
				
			}
			else if ([reportType isEqualToString:@"chartMonthsData"]){
				for (NSString *dateVal in yArray) {
					[df setDateFormat:@"yyyy-MM"];
					NSDate *tempDate = [df dateFromString: dateVal];
					[df setDateFormat:@"MM"];
					NSString *month = [df stringFromDate:tempDate];
					if ([month isEqualToString:@"01"]){
						month = @"Jan";
					}
					else if ([month isEqualToString:@"02"]){
						month = @"Feb";
					}
					else if ([month isEqualToString:@"03"]){
						month = @"Mar";
					}
					else if ([month isEqualToString:@"04"]){
						month = @"Apr";
					}
					else if ([month isEqualToString:@"05"]){
						month = @"May";
					}
					else if ([month isEqualToString:@"06"]){
						month = @"Jun";
					}
					else if ([month isEqualToString:@"07"]){
						month = @"Jul";
					}
					else if ([month isEqualToString:@"08"]){
						month = @"Aug";
					}
					else if ([month isEqualToString:@"09"]){
						month = @"Sep";
					}
					else if ([month isEqualToString:@"10"]){
						month = @"Oct";
					}
					else if ([month isEqualToString:@"11"]){
						month = @"Nov";
					}
					else if ([month isEqualToString:@"12"]){
						month = @"Dec";
					}
					[dateCSV addObject: month];
				}
				
			}
			dateValues = [dateCSV componentsJoinedByString:@"|"];
			
			
			chartViewURL = [chartViewURL stringByAppendingFormat: @"http://chart.apis.google.com/chart?chts=464646,20&cht=bvs&chbh=a&chd=t:%@&chs=640x336&chl=%@&chxt=y&chds=%d,%d&chxr=0,%d,%d,%d&chf=c,lg,90,E2E2E2,0,FEFEFE,0.5&chco=a3bcd3&chls=4&chxs=0,464646,14,0,t|1,464646,14,0,_", xValues, dateValues, minBuffer,maxBuffer, minBuffer,maxBuffer, yInterval];
			NSLog(@"google chart url: %@", chartViewURL);
			chartViewURL = [chartViewURL stringByAddingPercentEscapesUsingEncoding:NSUTF8StringEncoding];
			statsRequest = TRUE;
			if ([reportType isEqualToString:@"chartDaysData"]) {
				statsPageControlViewController.chart1URL = chartViewURL;
				[statsPageControlViewController refreshImage: 1];
			}
			else if ([reportType isEqualToString:@"chartWeeksData"]){
				statsPageControlViewController.chart2URL = chartViewURL;
				[statsPageControlViewController refreshImage: 2];
			}
			else if ([reportType isEqualToString:@"chartMonthsData"]){
				statsPageControlViewController.chart3URL = chartViewURL;
				[statsPageControlViewController refreshImage: 3];
			}
		} //end chartData if statement
		else{
			if ([reportType isEqualToString:@"viewsData"]){
				self.viewsData = [[NSArray alloc] initWithArray:statsTableData copyItems:YES];
				[self.tableView reloadData];		
			}
			if ([reportType isEqualToString:@"postViewsData"]){
				self.postViewsData = [[NSArray alloc] initWithArray:statsTableData copyItems:YES];
				[self.tableView reloadData];		
			}
			if ([reportType isEqualToString:@"referrersData"]){
				self.referrersData = [[NSArray alloc] initWithArray:statsTableData copyItems:YES];
				[self.tableView reloadData];		
			}
			if ([reportType isEqualToString:@"searchTermsData"]){
				self.searchTermsData = [[NSArray alloc] initWithArray:statsTableData copyItems:YES];
				[self.tableView reloadData];		
			}
			if ([reportType isEqualToString:@"clicksData"]){
				self.clicksData = [[NSArray alloc] initWithArray:statsTableData copyItems:YES];
				[self.tableView reloadData];		
			}
			
		}
	}
	else {
		NSLog(@"No data returned! oh noes!");
		if (!foundStatsData && ![reportType isEqualToString:@"apiKeyData"]){
			[self.tableView.tableHeaderView removeFromSuperview];
			[noDataError setHidden: FALSE];
		}
		
	}
	[self.view setHidden:FALSE];
	[spinner dismissWithClickedButtonIndex:0 animated:YES];
	
	
	
}

/*  NSURLConnection Methods  */

- (void)connection:(NSURLConnection *)connection didReceiveAuthenticationChallenge:(NSURLAuthenticationChallenge *)challenge {
	if ([challenge previousFailureCount] == 0)
	{
		NSURLCredential *newCredential;
		NSString *s_username, *s_password;
		s_username = [[NSUserDefaults standardUserDefaults] objectForKey:@"wpcom_username_preference"];
		s_password = [[NSUserDefaults standardUserDefaults] objectForKey:@"wpcom_password_preference"];
		
		newCredential=[NSURLCredential credentialWithUser:s_username
												 password:s_password
											  persistence:NSURLCredentialPersistenceForSession];
		[[challenge sender] useCredential:newCredential forAuthenticationChallenge:challenge];
		dotorgLogin = TRUE;
		
	}
}

- (void) connection:(NSURLConnection *)connection didReceiveData:(NSData *)data {
	//add the data to the corresponding NSURLConnection object
	NSMutableDictionary *connectionInfo = CFDictionaryGetValue(connectionToInfoMapping, connection);
	if ([connectionInfo objectForKey:@"apiKeyData"] != nil)
		[[connectionInfo objectForKey:@"apiKeyData"] appendData:data];
	else if ([connectionInfo objectForKey:@"postViewsData"] != nil)
		[[connectionInfo objectForKey:@"postViewsData"] appendData:data];
	else if ([connectionInfo objectForKey:@"referrersData"] != nil)
		[[connectionInfo objectForKey:@"referrersData"] appendData:data];
	else if ([connectionInfo objectForKey:@"searchTermsData"] != nil)
		[[connectionInfo objectForKey:@"searchTermsData"] appendData:data];
	else if ([connectionInfo objectForKey:@"clicksData"] != nil)
		[[connectionInfo objectForKey:@"clicksData"] appendData:data];
	else if ([connectionInfo objectForKey:@"viewsData"] != nil)
		[[connectionInfo objectForKey:@"viewsData"] appendData:data];
	else if ([connectionInfo objectForKey:@"chartDaysData"] != nil)
		[[connectionInfo objectForKey:@"chartDaysData"] appendData:data];
	else if ([connectionInfo objectForKey:@"chartWeeksData"] != nil)
		[[connectionInfo objectForKey:@"chartWeeksData"] appendData:data];
	else if ([connectionInfo objectForKey:@"chartMonthsData"] != nil)
		[[connectionInfo objectForKey:@"chartMonthsData"] appendData:data];
}

- (void)connectionDidFinishLoading: (NSURLConnection*) connection {
	NSMutableDictionary *connectionInfo = [connection valueForKey:@"connectionToInfoMapping"];
	NSString *xmlString = [[NSString alloc] initWithString: @""]; 
	//get the key name
	NSArray *keys = [connectionInfo allKeys];
	id aKey = [keys objectAtIndex:0];
	NSString *reportType = aKey;
	//format the xml response
	xmlString = [[NSString alloc] initWithData:[connectionInfo objectForKey:aKey] encoding:NSUTF8StringEncoding];
	xmlString = [xmlString stringByReplacingOccurrencesOfString:@"\n" withString:@""];
	xmlString = [xmlString stringByReplacingOccurrencesOfString:@"\t" withString:@""];
	NSLog(@"xml string = %@", xmlString);
	NSRange textRange;
	
	textRange =[xmlString rangeOfString:@"Error"];
	if ( xmlString != nil && textRange.location == NSNotFound ) {
		[self startParsingStats: xmlString withReportType: reportType];
	}
	else if (textRange.location != NSNotFound){
		[connection cancel];
		[spinner dismiss];
		//it's the wrong API key, prompt for WPCom login details again
		if(DeviceIsPad() == YES) {
			WPcomLoginViewController *wpComLogin = [[WPcomLoginViewController alloc] initWithNibName:@"WPcomLoginViewController-iPad" bundle:nil];	
			[self.navigationController pushViewController:wpComLogin animated:YES];
			[wpComLogin release];
		}
		else {
			WPcomLoginViewController *wpComLogin = [[WPcomLoginViewController alloc] initWithNibName:@"WPcomLoginViewController" bundle:nil];	
			[appDelegate.navigationController presentModalViewController:wpComLogin animated:YES];
			[wpComLogin release];
		}
		if (!statsAPIAlertShowing){
			BlogDataManager *dm = [BlogDataManager sharedDataManager];	
			
			[dm.currentBlog removeObjectForKey:@"api_key"];
			UIAlertView *alert = [[[UIAlertView alloc] initWithTitle:@"WordPress.com Stats" 
															 message:@"API Key not found. Please enter an administrator login for this blog." 
															delegate:self cancelButtonTitle:@"Cancel" otherButtonTitles:nil] autorelease];
			[alert addButtonWithTitle:@"OK"];
			[alert setTag:2];
			[alert show];
			statsAPIAlertShowing = TRUE;
		}
		
	}
	else {
		NSLog(@"no data returned from api");
	}
}

- (void)connection:(NSURLConnection *)connection didReceiveResponse:(NSURLResponse *)response {
	
	if ([response respondsToSelector:@selector(statusCode)])
	{
		int statusCode = [((NSHTTPURLResponse *)response) statusCode];
		if (statusCode >= 400)
		{
			[connection cancel];  // stop connecting; no more delegate messages
			NSDictionary *errorInfo
			= [NSDictionary dictionaryWithObject:[NSString stringWithFormat:
												  NSLocalizedString(@"Server returned status code %d",@""),
												  statusCode]
										  forKey:NSLocalizedDescriptionKey];
			NSError *statusError = [NSError errorWithDomain:@"org.wordpress.iphone"
													   code:statusCode
												   userInfo:errorInfo];
			[self connection:connection didFailWithError:statusError];
		}
	}
}

- (void)connection: (NSURLConnection *)connection didFailWithError: (NSError *)error
{		
	[spinner dismissWithClickedButtonIndex:0 animated:YES];
	//UIAlertView *alert = [[[UIAlertView alloc] initWithTitle:@"Connection Error" 
	//												 message:[error errorInfo] 
	//												delegate:self cancelButtonTitle:@"OK" otherButtonTitles:nil] autorelease];
	//[alert show];
	NSLog(@"ERROR: %@", [error localizedDescription]);
	
	[connection autorelease];
}

/*  XML Parsing  */

- (void)parser:(NSXMLParser *)parser didStartElement:(NSString *)elementName namespaceURI:(NSString *)namespaceURI qualifiedName:(NSString *)qName attributes:(NSDictionary *)attributeDict {
	self.currentProperty = [NSMutableString string];
	if (statsRequest) {
		if ([elementName isEqualToString:@"views"] || [elementName isEqualToString:@"postviews"] || [elementName isEqualToString:@"referrers"] 
			|| [elementName isEqualToString:@"clicks"] || [elementName isEqualToString:@"searchterms"] || [elementName isEqualToString:@"videoplays"] 
			|| [elementName isEqualToString:@"title"]) {
			rootTag = elementName;
		}
		else if ([elementName isEqualToString:@"total"]){
			//that'll do pig, that'll do.
			[parser abortParsing];
		}
		else {
			if ([elementName isEqualToString:@"post"]){
				leftColumn = [attributeDict objectForKey:@"title"];
			}
			else if ([elementName isEqualToString:@"day"] || [elementName isEqualToString:@"week"] || [elementName isEqualToString:@"month"]){
				leftColumn = [attributeDict objectForKey:@"date"];
			}
			else if ([elementName isEqualToString:@"referrer"] || [elementName isEqualToString:@"searchterm"]  || [elementName isEqualToString:@"click"]){
				leftColumn = [attributeDict objectForKey:@"value"];
			}
			yValues = [yValues stringByAppendingString: [leftColumn stringByAppendingString: @","]];
			if (leftColumn != nil){
				[yArray addObject: leftColumn];
			}
		}
	}
	
	for (id key in attributeDict) {
		
		NSLog(@"attribute: %@, value: %@", key, [attributeDict objectForKey:key]);
		
	}
	
}

- (void)parser:(NSXMLParser *)parser foundCharacters:(NSString *)string {
	
	if (self.currentProperty) {
        [currentProperty appendString:string];
    }
    
	
}

- (void)parser:(NSXMLParser *)parser didEndElement:(NSString *)elementName namespaceURI:(NSString *)namespaceURI qualifiedName:(NSString *)qName {
	BlogDataManager *dm = [BlogDataManager sharedDataManager];
	if (statsRequest){
		if ([elementName isEqualToString:@"post"] || [elementName isEqualToString:@"day"] || [elementName isEqualToString:@"referrer"] || 
			[elementName isEqualToString:@"week"] || [elementName isEqualToString:@"month"] || [elementName isEqualToString:@"searchterm"]
			|| [elementName isEqualToString:@"click"]){
			rightColumn = self.currentProperty;
			[xArray addObject: [NSNumber numberWithInt:[currentProperty intValue]]];
			NSArray *row = [[NSArray alloc] initWithObjects:leftColumn, rightColumn, nil];
			[statsTableData	addObject:row];
		}
	}
	else if ([elementName isEqualToString:@"apikey"]) {
		[dm.currentBlog setObject:self.currentProperty forKey:@"api_key"];
		[dm saveCurrentBlog];
		apiKeyFound = TRUE;
		[parser abortParsing];
		[spinner show];
		//this will run the 'views' report for the past 7 days
		[self refreshStats: 0 reportInterval: 0];
	}
	
	self.currentProperty = nil;
}

- (void)alertView:(UIAlertView *)alertView didDismissWithButtonIndex:(NSInteger)buttonIndex {
    if (buttonIndex == 0 && alertView.tag == 1) {
        [[UIApplication sharedApplication] openURL:[NSURL URLWithString:@"http://wordpress.org/extend/plugins/stats/"]];
    }
	else if (buttonIndex == 0 && alertView.tag == 2) {
        statsAPIAlertShowing = FALSE;
		canceledAPIKeyAlert = TRUE;
		[appDelegate.navigationController dismissModalViewControllerAnimated: TRUE];
    }
	else if (buttonIndex == 1 && alertView.tag == 2) {
        statsAPIAlertShowing = FALSE;
    }
}



- (NSInteger)numberOfSectionsInTableView:(UITableView *)tableView {
	return 5;
}


- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section {
	tableView.separatorStyle = UITableViewCellSeparatorStyleSingleLine;
	tableView.backgroundColor = [UIColor clearColor];
	int count = 0;
	switch (section) {
		case 0:
			count = [viewsData count];
			break;
		case 1:
			count = [postViewsData count];
			break;
		case 2:
			count = [referrersData count];
			break;
		case 3:
			count = [searchTermsData count];
			break;
		case 4:
			count = [clicksData count];
			break;
	}
	if (count > 10){
		count = 10;
	}
	return count;
}


- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath {
	
	NSArray *row = [[NSArray alloc] init];
	switch (indexPath.section) {
		case 0:
			row = [viewsData objectAtIndex:indexPath.row];
			break;
		case 1:
			row = [postViewsData objectAtIndex:indexPath.row];
			break;
		case 2:
			row = [referrersData objectAtIndex:indexPath.row];
			break;
		case 3:
			row = [searchTermsData objectAtIndex:indexPath.row];
			break;
		case 4:
			row = [clicksData objectAtIndex:indexPath.row];
			break;
	}
	
	NSString *leftColumn = [row objectAtIndex:0];
	NSString *rightColumn = [row objectAtIndex:1];
	

	NSString *MyIdentifier = [NSString stringWithFormat:@"MyIdentifier %i", indexPath.row];
	
	StatsTableCell *cell = (StatsTableCell *)[tableView dequeueReusableCellWithIdentifier:MyIdentifier];
	
	//if (cell == nil) {
		cell = [[[StatsTableCell alloc] initWithFrame:CGRectZero reuseIdentifier:MyIdentifier] autorelease];
		if (viewsData != nil) {
		UILabel *label = [[[UILabel	alloc] initWithFrame:CGRectMake(10.0, 0, 130.0, 
																	tableView.rowHeight)] autorelease]; 
		

		
		[cell addColumn:140];
		label.tag = LABEL_TAG; 
		label.font = [UIFont systemFontOfSize:12.0]; 
		label.text = leftColumn;
		label.textAlignment = UITextAlignmentLeft; 
		label.textColor = [UIColor grayColor]; 
		label.autoresizingMask = UIViewAutoresizingFlexibleRightMargin | 
		UIViewAutoresizingFlexibleHeight; 
		[cell.contentView addSubview:label]; 
		
		label =  [[[UILabel	alloc] initWithFrame:CGRectMake(160.0, 0, 130.0, 
															tableView.rowHeight)] autorelease]; 
		[cell addColumn:130];
		label.tag = VALUE_TAG; 
		label.font = [UIFont systemFontOfSize:12.0]; 
		label.text = rightColumn;
		label.textAlignment = UITextAlignmentLeft; 
		label.textColor = [UIColor grayColor]; 
		label.autoresizingMask = UIViewAutoresizingFlexibleRightMargin | 
		UIViewAutoresizingFlexibleHeight; 
		[cell.contentView addSubview:label];
		}
	//}
	
	return cell;
}


- (void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath {
	// Navigation logic
}

- (NSString *)tableView:(UITableView *)tableView titleForHeaderInSection:(NSInteger)section {
	NSString *reportName = [[NSString alloc] init];
	switch (section) {
		case 0:
			if (viewsData != nil){
				reportName = @"Views";
			}
			break;
		case 1:
			if (postViewsData != nil){
				reportName = @"Post Views";
			}
			break;
		case 2:
			if (referrersData != nil){
				reportName = @"Referrers";
			}
			break;
		case 3:
			if (referrersData != nil){
				reportName = @"Search Terms";
			}
			break;
		case 4:
			if (clicksData != nil){
				reportName = @"Clicks";
			}
			break;
	}
	return reportName;
}

- (void)viewDidAppear:(BOOL)animated {
	[super viewDidAppear:animated];
}

- (void)viewWillDisappear:(BOOL)animated {
}

- (void)viewDidDisappear:(BOOL)animated {
}


- (BOOL)shouldAutorotateToInterfaceOrientation:(UIInterfaceOrientation)interfaceOrientation {
	// Return YES for supported orientations
	return (interfaceOrientation == UIInterfaceOrientationPortrait);
}


- (void)didReceiveMemoryWarning {
	[super didReceiveMemoryWarning]; // Releases the view if it doesn't have a superview
	// Release anything that's not essential, such as cached data
}


- (void)dealloc {
	[viewsData release];
	[postViewsData release];
	[referrersData release];
	[searchTermsData release];
	[clicksData release];
	[reportTitle release];
	
	[selectedIndexPath release];
	[currentBlog release];
	[statsData release];
	[currentProperty release];
	[rootTag release];
	[statsTableData release];
	[leftColumn release];
	[rightColumn release];
	[spinner release];
	[xArray release];
	[yArray release];
	[xValues release];
	[yValues release];
	[wpcomLoginTable release];
	[statsPageControlViewController release];
	[noDataError release];
	
	[super dealloc];
}

@end

