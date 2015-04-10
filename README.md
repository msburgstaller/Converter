# Converter
__Package__: com.severinburgstaller.converter

## Scope
This project aims to provide a very basic converter app for currencies based on Fixr and implements angular services for this API.

## Primary purpose
The project is an assignment HCI course organized by CS faculty of the  University of Vienna in summer term.

## Platforms
The project will run on Android and iOS. Pre-built (but unsigned) binaries for iOS and Android, as well as Cordova prepared structures for compilation are included.

The project can be prepared using "cordova prepare", though it is not recommended. For preparation (if not using pre-prepared structures) use Ionic ("ionic prepare") instead.

### iOS
The app will run fine on iOS 7+ (most likely it will also run fine on iOS 6, but is untested there).

### Android
The app will run fine on Android 4.4+ (most likely it will also run fine on Android 4.0-4.3, but is untested there).

## Frameworks
This project uses Ionic and dependencies like Angular.JS and Cordova. As Ionic suggests gulp is used for build automation.

## Documentation
Documentation is annotated with @ngdoc. Pre-built docs are included and pushed to this repo. To view docs run "gulp serve-docs".

## Build automation
Some build tasks were abstracted with Gulp. It also is a requirement for Ionic. Documentation can be re-built with Gulp task docs. Also built docs (to be read) shall be served with Gulp "serve-docs" task.

__Install Gulp__

    npm install gulp -g
    
__Use Gulp__
    
    gulp [Task]

## Hooks
Standard Cordova hooks provided by Ionic are used. They are used to adapt for various platforms after preparation.

## Artwork
Default Ionic artwork. No adaptions here.

## License
This project is licensed under MIT license. Any framework used is licensed under the respective license of the framework itself.

## GitHub
Find the project on GitHub: [https://github.com/freakySevi/Converter]