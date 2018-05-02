 var Questions = React.createClass({
            
            getInitialState: function(){
                return({
                    isHidden: false
                });
            },

   
        componentWillMount : function(){

            this.toggleHidden();
            },
            
        toggleHidden() {
            this.setState({
                 isHidden: !this.state.isHidden
            });
            console.log(this.state.isHidden);
        },
            
        render: function(){
               return (
                <div id="questions-container">
                <button onClick={this.toggleHidden} >
                     Ask your question.
                </button>
                <p>Hello I am a questions container</p>
                {!this.state.isHidden && <Child00 onClick={this.toggleHidden}/>}
                 </div>
               );
        } // end of Questions render
    }); // end of Questions component.