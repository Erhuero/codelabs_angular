import 'jest-preset-angular/setup-jest';
import { TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import 'zone.js/testing';

beforeAll( ()=> {
    TestBed.initTestEnvironment(BrowserDynamicTestingModule, 
        platformBrowserDynamicTesting());
});
