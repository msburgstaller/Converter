Name:       Severin Burgstaller
Matr.-Nr.:  a1301837
Gruppe:     03
 
Framework:    Cordova - iOS / Cordova - Android
API-Version:  Android Lollipop 4.4+ / iOS 6+
 
Gerät(e), auf dem(denen) getestet wurde: Motorola Moto G, iPhone 6 (iOS 8)
 
Entwicklungsumgebung (für Android relevant):
PHPStorm
 
Externe Libraries und Frameworks:
Ionic
 
Dauer der Entwicklung:
3h
 
Weitere Anmerkungen:
This was the previous Readme.md:

# SBConverter

## Scope
This project aims to provide a very basic converter "app" for currencies based on Fixr and implements angular services for this API.

## Purpose
This project is an assignment for HCI course in summer term.

## Requirements
The project will run on Android and iOS. Pre-built binaries for iOS and Android, as well as Cordova prepared structures for compilation are included.

### iOS
The app will run fine on iOS 6+.

### Android
The app will run fine on Android 4.4+. To avoid exceeding the context, Android 4.0 to 4.3 were left out. To implement a fix for those versions, scrolling is an issue, but may be fixed with JS scrolling frameworks or other mobile frameworks that implement those, like jQuery Mobile or Ionic.

## Frameworks
This project uses Angular.JS, Bootstrap and jQuery as frontend frameworks and Cordova without plugins as a native framework.

## Documentation
Documentation is done with @ngdoc. Pre-built docs are included and pushed to this repo.

## Build automation
Some build tasks were abstracted with Gulp. Documentation can be built with Gulp task docs. Also built docs (to be read) shall be served with Gulp "serve-docs" task.