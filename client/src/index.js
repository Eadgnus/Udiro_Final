import express from 'express'
import { rootURL } from './network/http';
import TokenStorage from './db/token';
import Socket from './network/socket';
import AuthService from './service/auth';



const baseURL = rootURL;
const tokenStorage = new TokenStorage();
const httpClient = new HttpClient(baseURL);
const authErrorEventBus = new AuthErrorEventBus();
const authService = new AuthService(httpClient, tokenStorage);
const socketClient = new Socket(baseURL, () => tokenStorage.getToken());
const tweetService = new TweetService(httpClient, tokenStorage, socketClient);