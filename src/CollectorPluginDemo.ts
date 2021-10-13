import { Component, Entity, FGame, FPlugin, NamedComponent } from 'freerunner'
import CollectorPlugin, { C_Collector, E_Collectable, E_Collector } from './CollectorPlugin'

const CollectorPluginDemo: FPlugin = {
    name: 'CollectorPluginDemo',
	load(F: FGame) {
        console.log('Running Collector demo')
        
        // load plugin
        F.loadPlugin(CollectorPlugin)
        
        // init world
        F.init(500, 500, 'game').background('powderblue')

        // add basic floor
        F.createEntity('Floor, Color, DOM, 2D')
            .attr({x:0, y:400, h:25, w:500})
            .color('forestgreen')
        F.createEntity('Floor, Color, DOM, 2D')
            .attr({x:0, y:425, h:85, w:500})
            .color('burlywood')

        /*
            Most basic example by creating an entity and using the 
            Collectable component directly, see how we must copy code to create more apples.
        */
        // add Apple - collectable: Apple
        F.createEntity<E_Collectable>('Apple, Collectable, , Gravity, DOM , Color')
            .attr({x:100, y:80, h:20, w:20})
            .collectable('Apple')
            .color('red')
            .gravity('Floor')
            .bind('$Collect', function(this: Entity, collector: C_Collector) {
                console.log('Apple: Collected by', collector)
                // delete entity
                this.destroy()
            })

        // add Player - collector: Apple
        const player = F.createEntity<E_Collector>('Player, Gravity, Color, Twoway, DOM, Collector')
            .attr({x: 200, y: 100, h:60, w:20 })
            .twoway(200, 200).color('black')
            .gravity('Floor')
            .collector('Apple', function(collectable: E_Collectable) {
                console.log('Player: Mmmm apple..', collectable)
                /*
                 Here is a good place to trigger cascading events related to player
                 ex for inventory keeping, scores, stats
                */
            })
            

        /*
        Another collectable example, a Hat
        Instead of creating an entity directly we create a hat component, 
        the result is the same, but this one is more generic, we could make 
        entities with the hat component but giving them diffenet sizes, sprites etc

        We also create a HatCollector component - any entity with this component can 
        pick up hats.
        */

        // Hat as collectable component
        F.createComponent<NamedComponent>({
            name: 'Hat',
            required: 'Collectable, DOM, Color, 2D, Gravity',
            init() {
                this.color('olive')
                this.gravity('Floor')
                this.collectable('Hat')
            },
            events: {
                '$Collect': function(this: Component, collector: C_Collector) {
                    console.log('Hat: Collected by', collector)
                    this.antigravity()
                    collector.attach(this)
                    this.y = collector.y - this.h
                    this.x = collector.x - (this.w-collector.w)/2
                }
            }
        })

        // HatCollector component
        F.createComponent<NamedComponent>({
            name: 'HatCollector',
            required: 'Collector',
            init: function() {
                this.collector('Hat')
            },
            events: {
                '$CollectedHat': function(collectable: E_Collectable) {
                    console.log('HatCollector: Found a hat', collectable)
                }
            }
        })

        // create hat from component
        F.createEntity('Hat').attr({x:350, y:300, h:10, w:60})

        // add HatCollector to player 
        // remove this line and player can't pick up the hat
        player.addComponent('HatCollector')

        // want another hat? See how easy it is with the component
        // F.createEntity('Hat').attr({x:10, y:300, h:60, w:40}).color('goldenrod')
    }
}

export default CollectorPluginDemo
