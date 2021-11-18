import React, { Component } from "react";

const itemStyles = {
  padding: "1em",
  borderBotton: "1px solid #000000",
  marginTop: "0,4em"
};

class Item extends Component {
  handleClick = () => {
    this.props.onRemove(this.props.item);
  };

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.item.id !== this.props.item.id) {
      return true;
    }
    return false;
  }

  render() {
    const { item } = this.props;
    return (
      <div style={itemStyles}>
        <button onClick={this.handleClick}>x</button>
        <span>{item.text}</span>
      </div>
    );
  }
}
class App extends Component {
  state = {
    list: []
  };

  agregar = (e) => {
    e.preventDefault();
    const text = e.target[0].value;
    const id = Math.random().toString(16);
    const pendiente = { text, id };
    this.setState((state) => ({
      list: [...state.list, pendiente]
    }));

    e.target[0].value = "";
  };

  delete = (item) => {
    this.setState((state) => ({
      list: state.list.filter((iteration_item) => {
        return item.id !== iteration_item.id;
      })
    }));
  };

  render() {
    return (
      <div>
        <h3>shouldComponentUpdate - lista de pendientes</h3>
        <form onSubmit={this.agregar}>
          <input type="text" placeholder="ingresa tu pendiente" />
          <button> Agregar ! </button>
        </form>
        <div>
          {this.state.list.map((item) => (
            <Item key={item.id} item={item} onRemove={this.delete} />
          ))}
        </div>
      </div>
    );
  }
}
export default App;
