"use strict";

var firebase = new Firebase('https://dazzling-torch-734.firebaseio.com/');

var alarmSound = new Audio("chime.mp3");

var workCount = 0;
var workStarted = false;
var workStartTime = 0;
var workStartDay = 0;
var workTotalElapsed = 0;
var workInterval = 0;

var workStart = function(){
	workStartTime = new Date().getTime();
	workStartDay = moment().format('MMDDYYYY');
	workInterval = setInterval(function(){ workCount++ }, 1000);
};

var workStop = function(){
	var workStopTime = new Date().getTime();
	workTotalElapsed += (workStopTime - workStartTime);
	
	var workDate = new Firebase('https://dazzling-torch-734.firebaseio.com/intervals/work/'+workStartDay);
	workDate.set({ totalElapsed: workTotalElapsed });

	clearInterval(workInterval);
};

var getWorkCount = function(){
	return workCount;
};

var workClicker = function(workStatus, playStatus){
	if (workStatus) {
		workStart();
		if (playStatus){
			playStop();
		};
		chrome.browserAction.setBadgeText({text: "w"});
	} else {
		workStop();
		chrome.browserAction.setBadgeText({text: ""});
	};
	return workStatus
};

// **************************************************

var playCount = 0;
var playStarted = false;
var playStartTime = 0;
var playStartDay = 0;
var playTotalElapsed = 0;
var playInterval = 0;

var playStart = function(){
	playStartTime = new Date().getTime();
	playStartDay = moment().format('MMDDYYYY');
	playInterval = setInterval(function(){ playCount++ }, 1000);
};

var playStop = function(){
	var playStopTime = new Date().getTime();
	playTotalElapsed += (playStopTime - playStartTime);
	
	var playDate = new Firebase('https://dazzling-torch-734.firebaseio.com/intervals/play/'+playStartDay);
	playDate.set({ totalElapsed: playTotalElapsed });

	clearInterval(playInterval);
};

var getPlayCount = function(){
	return playCount;
};

var playClicker = function(playStatus, workStatus){
	if (playStatus) {
		playStart();
		if (workStatus){
			workStop();
		};
		chrome.browserAction.setBadgeText({text: "p"});
	} else {
		playStop();
		chrome.browserAction.setBadgeText({text: ""});
	};
	return playStatus
};

function getPlayStatus(){
	return playStarted;
};


// function playAlert(){
//   var options = {
//     type: "basic",
//     title: "Take a break",
//     message: "It's been 30 minutes. Don't play all day!",
//     iconUrl: "timely4.png",
//     priority: 2
//   };
//   chrome.notifications.create("", options, createNotification);
//   alarmSound.play();
// };
// chrome.browserAction.setBadgeBackgroundColor({color:greenColor});
// chrome.browserAction.setBadgeText({text: "work"});
// chrome.browserAction.setBadgeText({text: ""});