import React, {Component} from 'react'
import {StyleSheet, View, TouchableOpacity, Alert, Button} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
//import {styles} from './style.css'
export default class home extends Component {
  state = {
    gameState: [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ],
    currentPlayer: 1,
  }

  componentDidMount () {
    this.initializeGame()
  }

  initializeGame = () => {
    this.setState({
      gameState: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ],
      currentPlayer: 1,
    })
  }

  renderIcon = (row, col) => {
    let value = this.state.gameState[row][col]

    switch (value) {
      case 1:
        return <Icon name='close' style={styles.cross} />
      case -1:
        return <Icon name='circle-o' style={styles.zero} />
      default:
        return <View />
    }
  }

  onTilePress = (row, col) => {
    const {currentPlayer, gameState} = this.state

    let value = gameState[row][col]
    if (value !== 0) {
      return
    }

    const arr = gameState.slice()
    arr[row][col] = currentPlayer

    let nextPlayer = currentPlayer === 1 ? -1 : 1
    this.setState({gameState: arr, currentPlayer: nextPlayer})

    let winner = this.getWinner()
    if (winner === 1) {
      setTimeout(() => {
        Alert.alert('Player 1 is a winner')
      }, 500)

      this.initializeGame()
    } else if (winner === -1) {
      setTimeout(() => {
        Alert.alert('Player 2 is a winner')
      }, 500)
      this.initializeGame()
    }
  }

  getWinner = () => {
    const tileNum = 3
    let sum
    let arr = this.state.gameState.slice()

    // To check rows
    for (let i = 0; i < tileNum; i++) {
      sum = arr[i][0] + arr[i][1] + arr[i][2]
      if (sum === 3) {
        return 1
      } else if (sum === -3) {
        return -1
      }
    }

    // To check col
    for (let i = 0; i < tileNum; i++) {
      sum = arr[0][i] + arr[1][i] + arr[2][i]
      if (sum === 3) {
        return 1
      } else if (sum === -3) {
        return -1
      }
    }

    // To check Diagnol
    sum = arr[0][0] + arr[1][1] + arr[2][2]
    if (sum === 3) {
      return 1
    } else if (sum === -3) {
      return -1
    }

    sum = arr[0][2] + arr[1][1] + arr[2][0]
    if (sum === 3) {
      return 1
    } else if (sum === -3) {
      return -1
    }
    //  For no winners
    return 0
  }

  newGame = () => {
    this.initializeGame()
  }

  render () {
    return (
      <View style={styles.container}>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            style={[styles.tile, {borderTopWidth: 0, borderLeftWidth: 0}]}
            onPress={() => this.onTilePress(0, 0)}>
            {this.renderIcon(0, 0)}
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tile, {borderTopWidth: 0}]}
            onPress={() => this.onTilePress(0, 1)}>
            {this.renderIcon(0, 1)}
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tile, {borderTopWidth: 0, borderRightWidth: 0}]}
            onPress={() => this.onTilePress(0, 2)}>
            {this.renderIcon(0, 2)}
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            style={[styles.tile, {borderLeftWidth: 0}]}
            onPress={() => this.onTilePress(1, 0)}>
            {this.renderIcon(1, 0)}
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tile, {}]}
            onPress={() => this.onTilePress(1, 1)}>
            {this.renderIcon(1, 1)}
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tile, {borderRightWidth: 0}]}
            onPress={() => this.onTilePress(1, 2)}>
            {this.renderIcon(1, 2)}
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            style={[styles.tile, {borderBottomWidth: 0, borderLeftWidth: 0}]}
            onPress={() => this.onTilePress(2, 0)}>
            {this.renderIcon(2, 0)}
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tile, {borderBottomWidth: 0}]}
            onPress={() => this.onTilePress(2, 1)}>
            {this.renderIcon(2, 1)}
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tile, {borderBottomWidth: 0, borderRightWidth: 0}]}
            onPress={() => this.onTilePress(2, 2)}>
            {this.renderIcon(2, 2)}
          </TouchableOpacity>
        </View>
        <View style={styles.button}>
          <Button title='New Game' onPress={this.newGame} />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'yellow',
  },
  tile: {
    borderWidth: 5,
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 100,
  },
  cross: {
    flex: 1,
    color: 'red',
    fontSize: 80,
  },
  zero: {
    flex: 1,
    color: 'green',
    fontSize: 80,
  },
  button: {
    padding: 40,
  },
})
