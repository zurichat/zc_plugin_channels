import React, {Component} from "react";
import { connect } from "react-redux";
import { Spinner } from "@chakra-ui/spinner"

class LoadingSpinner extends Component {
        state = {}
    render(){
          const {loading} = this.props
         if(!loading) return null;
    return(
        <Spinner
        thickness="4px"
  speed="0.65s"
  emptyColor="gray.200"
  color="black.400"
  size="lg"
        />
    )
    }
}
  const mapStateToProps = state => ({loading: state.app.loading});
export default connect(mapStateToProps)(LoadingSpinner);