/*global fetch*/
/*global React*/

var Child00 = React.createClass({

            getInitialState: function(){
                return({
                    newquestion: ''
                });
            },
 
            render: function(){
                
                return (
                    <div id="pookie00" >
                       <form id="addQandA" onSubmit={this.handleSubmit}>
                            <input type = "text" required ref="newquestion" name="newquestion" placeholder='Enter your question' onChange={this.onFormChange} />
                            <input type = "submit" value={this.state.labelclick}  />
                           </form>
                       <button onClick={this.props.onClick} style={{color: 'red'}}>
                      Cancel and Close
                    </button>
                     </div>
                );
            },
            
            //Custom functions
                    handleSubmit: function(e){
                        
                        e.preventDefault();
                        var newquestion = this.refs.newquestion.value;
                        
                       fetch('/api/ninjas', {
                          method: 'POST',
                          body: JSON.stringify({"name":newquestion}),
                              headers: {"Content-Type": "application/json"}
                        })
                        .then((response) => {
                          if (response.ok) {
                            console.log('(◕◡◕✿)');
                          }
                          else {
                            console.log('(╯◕︿◕)╯︵ ┻━┻ ');
                          }
                        })
                    },
                    
                    
                    toggleCheckboxChange: function() {
                        this.setState(({ isChecked }) => (
                          {
                            isChecked: !isChecked,
                          }
                        ));
                     } ,
                     // end of
                     
                     onFormChange: function(e){
                        const state = this.state
                        state[e.target.name] = e.target.value;
                        this.setState(state);
                      }

        }) // end of child00.