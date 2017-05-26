import React, { Component } from 'react';
import {
    View,
    Text,
    LayoutAnimation,
    TouchableWithoutFeedback,
    UIManager,
    Animated,
    Dimensions,
    PanResponder

} from 'react-native';

import { List, ListItem } from 'react-native-elements';
import albums from '../json/albums.json';

class Panel extends Component {
    constructor(props) {
        super(props);
        const position = new Animated.ValueXY();
        this.state = { height: this.props.expanded ? null : 0, position,
                        albums: [] }
    }

    componentWillMount() {
        this.setState({ albums });
        this.panResponder = PanResponder.create({
            //onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponderCapture: (this.onShouldDrag),
            onPanResponderMove: (event, gesture) => {
                this.state.position.setValue({ x: gesture.dx });
            },
            onPanResponderRelease: this.onReleaseItem,
            onPanResponderTerminate: this.onReleaseItem,
        });
    }

    onShouldDrag = (event, gesture) => {
        const { dx } = gesture;
        return Math.abs(dx) > 2;
    }

    onReleaseItem = (event, gesture) => {
        let config = {
            toValue: { x: 0, y: 0 },
            duration: 500,
        };

        Animated.spring(
            this.state.position,
            config,
        ).start();
    }


    render() {
        const { avatar, title, subtitle } = this.props;
        const { height, position } = this.state;
        return (
        <View>

            <Animated.View
                style={position.getLayout()}
                {...this.panResponder.panHandlers}
            >
                <TouchableWithoutFeedback>
                    <ListItem
                        style={styles.main}
                        avatar={avatar}
                        title={title}
                        subtitle={subtitle}
                        roundAvatar

                    />
                    
                </TouchableWithoutFeedback>
            </Animated.View>
        </View>
        );
    }
}

const styles = {
    main: {
        height: 'auto',
        paddingTop: 10,
        paddingBottom: 10,
        // position: 'absolute'
    },
};

export default Panel;
