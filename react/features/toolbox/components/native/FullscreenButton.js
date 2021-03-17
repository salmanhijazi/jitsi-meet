// @flow

import { type Dispatch } from 'redux';

import {
    createToolbarEvent,
    sendAnalytics
} from '../../../analytics';
import { IconFullScreen } from '../../../base/icons';
import { IconExitFullScreen } from '../../../base/icons';
import { toggleFullscreen } from '../../actions.native';
import { connect } from '../../../base/redux';
import { AbstractButton, type AbstractButtonProps } from '../../../base/toolbox/components';

/**
 * The type of the React {@code Component} props of {@link RaiseHandButton}.
 */
type Props = AbstractButtonProps & {
    /**
     * Whether the participant enabled fullscreen or not.
     */
    _fullscreen: boolean,

    /**
     * The redux {@code dispatch} function.
     */
    dispatch: Dispatch<any>
};

/**
 * An implementation of a button to raise or lower hand.
 */
class FullscreenButton extends AbstractButton<Props, *> {
    accessibilityLabel = 'Fullscreen';
    icon = IconFullScreen;
    toggledIcon = IconExitFullScreen;
    label = 'Enable Fullscreen';
    toggledLabel = 'Disable Fullscreen';

    /**
     * Handles clicking / pressing the button.
     *
     * @override
     * @protected
     * @returns {void}
     */
    _handleClick() {
        this._toggleFullscreen();
    }

    /**
     * Indicates whether this button is in toggled state or not.
     *
     * @override
     * @protected
     * @returns {boolean}
     */
    _isToggled() {
        return this.props._fullscreen;
    }

    /**
     * Toggles the fullscreen status of the local participant.
     *
     * @returns {void}
     */
    _toggleFullscreen() {
        const enabled = !this.props._fullscreen;

        this.props.dispatch(toggleFullscreen(enabled));
    }
}

/**
 * Maps part of the Redux state to the props of this component.
 *
 * @param {Object} state - The Redux state.
 * @private
 * @returns {Props}
 */
function _mapStateToProps(state): Object {
    return {
        visible: true
    };
}

export default connect(_mapStateToProps)(FullscreenButton);
