/*global React*/
/*global fetch*/

 var Questions = React.createClass({
            
            getInitialState: function(){
                return({
                    isHidden: false, 
                    displayData: []
                });
            },

   
        componentWillMount : function(){

            this.toggleHidden();
            this.getdata();
            },
            
        toggleHidden() {
            this.setState({
                 isHidden: !this.state.isHidden
            });
            console.log(this.state.isHidden);
        },
        
        getdata(){
            fetch('/api/ninjas').then(function(data){
                return data.json();
                    }).then( json => {
                        this.setState({
                             displayData: json
                        });
                        var test2 = this.state.displayData;
                        console.log(test2[0].name);
                     });
                 },
                 
        handleSubmit(newquestion){
                        
                   //     var newquestion = this.refs.newquestion.value;
                        
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
            
        render: function(){
            
             var ninjas = this.state.displayData;
                ninjas = ninjas.map(function(ninja, index){
                    return(
                        <li key={index}>
                            <span>{ninjas[index].name}</span>
                        </li>
                    );
                });
   
     

               return (
                <div id="questions-container">
                <button onClick={this.toggleHidden} >
                     Ask your question.
                </button>
                <p>Hello I am a questions container</p>
                {!this.state.isHidden && <Child00 onClick={this.toggleHidden} onSubmit={this.handleSubmit}/>}
                 <ul>{ninjas}</ul>
                </div>
                );


        } // end of Questions render
        
        
        
        
        
    }); // end of Questions component.