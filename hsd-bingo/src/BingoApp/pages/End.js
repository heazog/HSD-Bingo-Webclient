import React from 'react';
import data from '../Data';
import { Header, Button, Image, Table, Grid, Segment, Container} from 'semantic-ui-react';

/* CONSTANTS */
const winner_links = [  'https://media2.giphy.com/media/l4hLwMmFVBOAKF3EI/giphy.gif',
                        'https://media2.giphy.com/media/3o7TKF5DnsSLv4zVBu/giphy.gif',
                        'https://media4.giphy.com/media/9xt1MUZqkneFiWrAAD/giphy.gif?cid=ecf05e47ok4e9gf3hr29te6xlp38lrdt3rmaw9ykmjfq6f1u&rid=giphy.gif',
                        'https://i.imgur.com/hlAW0FX.gif',
                        'https://i.imgur.com/t55uVPw.gif'
                    ]

const loser_links = [   'https://media2.giphy.com/media/mcH0upG1TeEak/giphy.gif',
                        'https://media3.giphy.com/media/suCJQGchI6oBW/giphy.gif',
                        'https://media4.giphy.com/media/rKj0oXtnMQNwY/giphy.gif',
                        'https://media2.giphy.com/media/IhL8sICowZWmI/giphy.gif',
                        'https://media3.giphy.com/media/WrNfErHio7ZAc/giphy.gif?cid=ecf05e47ahzzaw2emt1fm7yndu4bk57sehu6kj54pv29gq1d&rid=giphy.gif'
]

/***********************************************************************************/
/***********************************************************************************/
/***********************************************************************************/

class End extends React.Component 
{
    constructor(props) {
        super(props);

        this.state = {
            subject: "",
            name: "",
            name_winner: "",
            error: false
        };

        this.play_again = this.play_again.bind(this);
        this.leave_game = this.leave_game.bind(this);

        this.get_subject();
        this.get_User();
        this.get_Winner();
    }

    async get_subject(){
        let subjects = await data.getLobby();

        if(subjects === null){
            this.state.error = true;
        }else{
            this.state.subject = subjects;
            this.state.error = false;
        }
    }

    async get_User(){
        let user = await data.getUser();
        
        if(user === null){
            this.state.error = true;
        }else{
            this.state.name = user.name;
            this.state.error = false;
        }
    }

    async get_Winner(){
        let winner = await data.getWinner();

        if(winner === null){
            this.state.error = true;
        }else{
            this.setState({name_winner: winner, error: false});
            //this.state.name_winner = winner;
            //this.state.error = false;
        }
    }

    play_again(){
        //get to lobby
    }

    leave_game(){
        //get to start screen
    }
      

/***********************************************************************************/
/***********************************************************************************/
/***********************************************************************************/
    Header_function = () => (
        <Grid columns='equal' padded>
            <Grid.Row textAlign='center'>
                <Grid.Column>
                    <Segment color='teal' inverted>
                        <Header as='h3'>HSD-BINGO</Header>
                    </Segment>
                </Grid.Column>
                <Grid.Column>
                    <Segment color='teal' inverted>
                        <Header as='h3'>{this.state.subject}</Header>
                    </Segment>
                </Grid.Column>
            </Grid.Row>
        </Grid>
      )
    
    Image_function_winner = () => (
        <Image src={winner_links[Math.floor(Math.random()*winner_links.length)]} fluid />
    )
    
    Image_function_loser = () => (
        <Image src={loser_links[Math.floor(Math.random()*loser_links.length)]} fluid />
    )
    
    Stats_best_list = () => (
        <Table color={'teal'} key={'teal1'}>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Ewige Bestenliste</Table.HeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                <Table.Row>
                    <Table.Cell>1. Reiter Misch</Table.Cell>
                </Table.Row>

                <Table.Row>
                    <Table.Cell>2. Fronz Sepp</Table.Cell>
                </Table.Row>

                <Table.Row>
                    <Table.Cell>3. Philip Mustang</Table.Cell>        
                </Table.Row>
                
                <Table.Row>
                    <Table.Cell>4. Falco</Table.Cell>        
                </Table.Row>

                <Table.Row>
                    <Table.Cell>5. Heinz Fischer</Table.Cell>        
                </Table.Row>
            </Table.Body>
        </Table>
    )
    
    Stats_fastest_games = () => (
        <Table color={'teal'} key={'teal2'}>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Schnellsten Spiele</Table.HeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                <Table.Row>
                    <Table.Cell>ISE1: 00:04:23</Table.Cell>
                </Table.Row>

                <Table.Row>
                    <Table.Cell>DNÜ1: 59:59:59</Table.Cell>
                </Table.Row>

                <Table.Row>
                    <Table.Cell>RTO1: 01:47:11</Table.Cell>        
                </Table.Row>

                <Table.Row>
                    <Table.Cell>PRJ1: 00:00:00</Table.Cell>        
                </Table.Row>

                <Table.Row>
                    <Table.Cell>SYM1: 01:00:01</Table.Cell>        
                </Table.Row>
            </Table.Body>
        </Table>
    )
      
    
    Grid_winner = () => (
        <Grid padded>
            <Grid.Row columns={2} textAlign='center' only='computer'> {/* padded is bei Row ned erlaubt */}
                <Grid.Column>
                    {this.Image_function_winner()}
                    {this.WinnerLable()}
                </Grid.Column>
                <Grid.Column>
                    {this.Stats_best_list()}
                    {this.Stats_fastest_games()}
                </Grid.Column>
            </Grid.Row>

            <Grid.Row columns={1} textAlign='center' only='tablet mobile'>
                <Grid.Column>
                    {this.Image_function_winner()}
                </Grid.Column>
            </Grid.Row>

            <Grid.Row columns={1} textAlign='center' only='tablet mobile'>
                <Grid.Column>
                    {this.WinnerLable()}
                </Grid.Column>
            </Grid.Row>

            <Grid.Row columns={1} textAlign='center' only='tablet mobile'>
                <Grid.Column>
                    {this.Stats_best_list()}  
                </Grid.Column>
            </Grid.Row>

            <Grid.Row columns={1} textAlign='center' only='tablet mobile'>
                <Grid.Column>
                    {this.Stats_fastest_games()}  
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
    
    Grid_loser = () => (
        <div>
            <Grid padded>
                <Grid.Row columns={2} textAlign='center' only='computer'>
                    <Grid.Column>
                        {this.Image_function_loser()}
                        {this.WinnerLable()}
                        {this.Button_function()} 
                    </Grid.Column>
                    <Grid.Column>
                        {this.Stats_best_list()}
                        {this.Stats_fastest_games()}
                    </Grid.Column>
                </Grid.Row>
    
                <Grid.Row columns={1} textAlign='center' only='tablet mobile'>
                    <Grid.Column>
                        {this.Image_function_loser()}
                    </Grid.Column>
                </Grid.Row>
    
                <Grid.Row columns={1} textAlign='center' only='tablet mobile'>
                    <Grid.Column>
                        {this.WinnerLable()}
                    </Grid.Column>
                </Grid.Row>
    
                <Grid.Row columns={1} textAlign='center' only='tablet mobile'>
                    <Grid.Column>
                        {this.Stats_best_list()}  
                    </Grid.Column>
                </Grid.Row>
    
                <Grid.Row columns={1} textAlign='center' only='tablet mobile'>
                    <Grid.Column>
                        {this.Stats_fastest_games()}  
                    </Grid.Column>
                </Grid.Row>
    
                <Grid.Row columns={1} textAlign='center' only='tablet mobile'>
                    <Grid.Column>
                        {this.Button_function()}  
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div>
    )
    
    WinnerLable = () => (
        <Header as='h1'>"{this.state.name_winner}" hat das Spiel gewonnen!</Header>
    )
    
    Button_function = () => (
        <div>
            <Grid relaxed padded>
                <Grid.Row columns={2} textAlign='center'>
                    <Grid.Column>
                        <Button positive>
                            Erneut spielen
                        </Button>  
                    </Grid.Column>
    
                    <Grid.Column>
                        <Button negative>
                            Spiel verlassen
                        </Button>
                    </Grid.Column>
                </Grid.Row>
            </Grid>  
        </div>
      )
    
/***********************************************************************************/
/***********************************************************************************/
/***********************************************************************************/

    render()
    { 
        /*WINNER*/
        if(this.state.name === this.state.name_winner)
        {
            return (
                <Container className="End">
                    {this.Header_function()}
                    {this.Grid_winner()}
                </Container>
                );
        }
        /*LOSER*/
        else
        {
            return (
                <Container className="End">
                    {this.Header_function()}
                    {this.Grid_loser()}
                </Container>
                );
        }
    }
}
export default End;