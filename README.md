<h1 align="center">Collector</h1>
<p align="center"><i>A Freerunner plugin</i></p>
<p align="center">
<a href="https://github.com/Sebring/freerunner"><img src="https://img.shields.io/github/package-json/dependency-version/Sebring/freerunner-plugin-collector/dev/freerunner"/></a>
<a href="https://github.com/Sebring/create-freerunner-plugin"><img src="https://img.shields.io/badge/create-freerunner--plugin-green"/></a>

</p>

This plugin register two componets, `Collectable` and `Collector`. When the two components collide events will be triggered on them both.

## Usage

This simple structure is a great base for building collectable entitites

-  General Loot
   -  Stars
   -  Coins
   -  Chests
   -  Power-ups)
-  Trigger Zones
   -  Buttons
   -  Traps
   -  Doors

Thanks to the event system it is easy to cascade events to also trigger

-  Debug log
-  Point System
-  Backend calls
-  Stats/Acheivments/Trophys
-  Side Effects (quests, attributes, map)

## Install

`yarn add --dev freerunner-plugin-collector`  
or  
`npm i -D freerunner-plugin-collector`

## Run

Register the plugin to have it create the components.

```javascript
import CollectorPlugin from 'freerunner-plugin-collector'
/* 
	... init freerunner as usual ..
	.*/
F.loadPlugin(CollectorPlugin)
```

### Demo

Load the `CollectorPluginDemo` to see it in action and/or [read its source](https://github.com/Sebring/freerunner-plugin-collector/blob/main/src/CollectorPluginDemo.ts) to understand how to use the plugin.

You can also clone/download this repo and run `yarn demo` to build the demo and open `/demo/demo.html` to run it.

```bash
npx degit sebring/freerunner-plugin-collector collector
yarn
yarn demo
```
