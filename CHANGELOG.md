# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Fixed

- The browser example was not working due to API changes.
- The Readme file was using the wrong package name

## [0.1.1] - 2022-07-16

### Fix

- A minor version bump for NPM

## [0.1.0] - 2022-07-16

### Added

- Removing Babel
- Using C8 and Mocha for native ES import testing
- Remove Grunt in favor of some simpler scripts in package.json
- Build a CJS module as part of the build process

## [0.0.3] - 2020-12-07

### Fixed

- Updated URLs for NOAA's API for the testing service
- Security update to developer dependencies

## [0.0.2] - 2019-11-14

### Added

- Tidal extreme calculations are expensive, so you can now use the `timeFidelity` option to define how exact you want the high/low tide dates to be.
