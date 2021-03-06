import { NamedComponent, Component, E_2D, FGame, FPlugin } from 'freerunner'

export interface C_Collector extends NamedComponent {
	collector(name: string, callback?: CollectorCallback): this
}
export interface E_Collector extends E_2D {
	collector(name: string, callback: CollectorCallback): this
}

export interface E_Collectable extends E_2D {
	collectable(name: string): this
}

export interface CollectableCallback {
	(collectable: E_Collector): void
}

export interface CollectorCallback {
	(collector: E_Collectable): void
}

const CollectorPlugin = {
	name: 'CollectorPlugin',
	load(F: FGame) {
		F.createComponent(Collectable)
		F.createComponent(Collector)
	},
}

export const Collectable: NamedComponent = {
	name: 'Collectable',
	required: 'Collision',
	init() {
		this._isCollected = false
		this._collectableName = ``
		return this
	},
	collectable(name: string, callback: CollectableCallback) {
		this._collectableName = `Collectable${name}`
		callback && this.bind('$Collect', callback)
		return this
	},
	events: {
		$Collect: function (this: Component) {
			if (!this._isCollected) {
				this._isCollected = true
			}
		},
	},
}

export const Collector: NamedComponent = {
	name: 'Collector',
	required: 'Collision, Motion',
	init() {
		this._collectorComp = []
		return this
	},
	events: {
		Move: function (this: Component) {
			for (const c of this._collectorComp) {
				const hits = this.hit(c)
				if (hits) {
					if (!hits[0].obj._isCollected) {
						!hits[0].obj.trigger('$Collect', this)
						this.trigger(`$Collected${c}`, hits[0].obj)
					}
				}
			}
		},
	},
	collector(this: Component, name: string, callback: CollectorCallback) {
		this._collectorComp = this._collectorComp ? [name, ...this._collectorComp] : [name]
		callback && this.bind(`$Collected${name}`, callback)
		return this
	},
}

export default <FPlugin>CollectorPlugin
