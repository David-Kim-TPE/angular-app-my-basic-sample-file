/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { DataService } from './data.service';
import { FileService } from './file.service';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';

import { SampleAssetComponent } from './SampleAsset/SampleAsset.component';
import { SampleParticipantComponent } from './SampleParticipant/SampleParticipant.component';
import { SampleTransactionComponent } from './SampleTransaction/SampleTransaction.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { SimpleDemoComponent } from './simple-demo/simple-demo.component';
import { HomeService } from './home/home.service';

  @NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SampleAssetComponent,
    SampleParticipantComponent,
    SampleTransactionComponent,
    FileUploadComponent,
    SimpleDemoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    DataService,
    FileService,
    HomeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
