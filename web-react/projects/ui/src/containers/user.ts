import { connect, Dispatch } from 'react-redux';
import { UserActions } from '../actions';
import { User } from '../components/user';
import { State } from '../reducers';

const mapStateToProps = (state: State) => {
    const user = state.user;
    return {
        id: user.id,
        name: user.name,
        isLoading: user.isLoading,
        hasError: user.hasError,
    };
};

const mapDispatchToProps = (dispatch: Dispatch<{}>) => {
    return {
        refresh: () => {
            dispatch(UserActions.fetchBegin());
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(User);
