import './App.css';
import React from 'react';


class App extends React.Component {
    state = {
        name: 'David',
        stats: {
            Strength: 0,
            Agility: 0,
            Prowess: 0,
            Charisma: 0,
        },
        total: 4,
    }
    constructor() {
        super();
        this.notifyStatChange = this.notifyStatChange.bind(this);
    }

    notifyStatChange(stat, value) {
        var stats = {};
        Object.assign(stats, this.state.stats);
        stats[stat] += value;
        this.setState({stats})
        // this.setState({stats, stats})
        
        var total = this.state.total - value;
        this.setState({total, total});
    }

    render() {
        const {stats, total} = this.state; // ES6 Destructuring
        return (
            <div>
                <StatEditor stats={stats} mine="Charisma" rtl="false" total={total}
                notifyStatChange={this.notifyStatChange} />
                <StatEditor stats={stats} mine="Prowess" rtl="false" total={total}
                notifyStatChange={this.notifyStatChange} />
                <StatEditor stats={stats} mine="Agility" rtl="false" total={total}
                notifyStatChange={this.notifyStatChange} />
                <StatEditor stats={stats} mine="Strength" rtl="false" total={total}
                notifyStatChange={this.notifyStatChange} />
                <input disabled value={this.state.total} />
            </div>
        )
    }
}

class StatEditor extends React.Component {
    constructor() {
        super();
        this.canDecrease = this.canDecrease.bind(this);
        this.decrease = this.decrease.bind(this);
        this.canIncrease = this.canIncrease.bind(this);
        this.increase = this.increase.bind(this);
    }

    canDecrease() {
        const stats = this.props.stats;
        const mine = this.props.mine;
        const val = stats[mine];
        return (val > 0);
    }
    decrease() {
        if (!this.canDecrease()) { return ; }
        this.props.notifyStatChange(this.props.mine, -1);
    }
    canIncrease() {
        const tot = this.props.total;
        const val = this.props.stats[this.props.mine];
        return (tot > 0) && (val < 2);
    }
    increase() {
        if (!this.canIncrease()) { return ; }
        this.props.notifyStatChange(this.props.mine, +1);
    }
    get_value() {
        return this.props.stats[this.props.mine];
    }

    render() {
        return (
            // <div className="propEditor" id={this.props.mine + "Editor"}>
            // //     <button className="adjuster"
            // //         disabled={!this.canDecrease()}
            // //         onClick={this.decrease}>-</button>
            //     <input disabled value={this.value()}/>

            // //     <span className="preText">&nbsp;{this.props.mine}</span>
                
            // <p> Hello </p>
            // </div>
            <div className="propEditor" id={this.props.mine + "Editor"}>
                <button className="adjuster"
                    disabled={!this.canDecrease()}
                    onClick={this.decrease}>-</button>
                <input disabled value={this.get_value()} />
                <button className="adjuster"
                    disabled={!this.canIncrease()}
                    onClick={this.increase}>+</button>

                <span className="preText">&nbsp;{this.props.mine}</span>
            </div>
        )
    }

}

class NameEditor extends React.Component {
    constructor(props) {
        super(props);
        this.onNameChange = this.onNameChange.bind(this);
    }

    onNameChange(e) {
        this.props.onNameChange(e.target.value);
    }
    render() {
        return (
            <p>
                <label for="name">Name: </label>
                <input type="text" id="name" value={this.props.name} onChange={this.onNameChange} />
            </p>
        )
    }
}

class NameGreeter extends React.Component {
    render() {
        if (this.props.name === "") {
            return (
                <p>Hello!</p>
            )
        } else {
            return (
                <p>Hello, {this.props.name}!</p>
            )
        }
    }
}

export default App;
