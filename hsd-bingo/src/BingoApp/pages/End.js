import React from 'react';
import data from '../Data';
import { Header, Button, Image, Table, Grid, Segment, Container} from 'semantic-ui-react';

/*  Konstanten für Gewinner oder Verlierer Screen*/
const winner_links = [  'https://media2.giphy.com/media/l4hLwMmFVBOAKF3EI/giphy.gif',
                        'https://media2.giphy.com/media/3o7TKF5DnsSLv4zVBu/giphy.gif',
                        'https://media4.giphy.com/media/9xt1MUZqkneFiWrAAD/giphy.gif?cid=ecf05e47ok4e9gf3hr29te6xlp38lrdt3rmaw9ykmjfq6f1u&rid=giphy.gif',
                        'https://i.imgur.com/hlAW0FX.gif',
                        'https://i.imgur.com/t55uVPw.gif',
                        'https://media.giphy.com/media/YOGN4rRD44hPDlVdha/giphy.gif'
                    ]

const loser_links = [   'https://media2.giphy.com/media/mcH0upG1TeEak/giphy.gif',
                        'https://media3.giphy.com/media/suCJQGchI6oBW/giphy.gif',
                        'https://media4.giphy.com/media/rKj0oXtnMQNwY/giphy.gif',
                        'https://media2.giphy.com/media/IhL8sICowZWmI/giphy.gif',
                        'https://media3.giphy.com/media/WrNfErHio7ZAc/giphy.gif?cid=ecf05e47ahzzaw2emt1fm7yndu4bk57sehu6kj54pv29gq1d&rid=giphy.gif',
                        'https://media.giphy.com/media/piTERt2CEdrLt2WLv0/giphy.gif'
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
    }

    componentDidMount(){
        this.get_subject();
        this.get_User();
        this.get_Winner();
    }

    //Get played subject. For example ISE1
    async get_subject(){
        let lobby_name = await data.getLobby();

        if(lobby_name === null){
            this.setState({error: true});
        }else{
            this.setState({subject: lobby_name, error: false});
        }
    }

    async get_User(){
        let userName = await data.getUser();
        
        if(userName === null){
            this.setState({error: true});
        }else{
            this.setState({name: userName, error: false});
        }
    }

    //Who won the game?
    async get_Winner(){
        let winner = await data.getWinner();

        if(winner === null){
            this.setState({error: true});
        }else{
            this.setState({name_winner: winner, error: false});
        }
    }

    //Back to Lobby Screen
    play_again(){
        this.props.goToPage(1);
    }

    //Back to starting page
    leave_game(){
        this.props.goToPage(0);
    }
      
/***********************************************************************************/
/***********************************************************************************/
    //Creates Header for our Endpage. Inserts the played subject dynamicly
    Header_function = () => (
        <Grid columns='equal' padded >
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
    
    //Inserts the Winner gif. This can only see players who won the bingo game
    Image_function_winner = () => (
        <Image src={winner_links[Math.floor(Math.random()*winner_links.length)]} fluid />
    )
    
    //All losers will see the pre defined loser gifs.
    Image_function_loser = () => (
        <Image src={loser_links[Math.floor(Math.random()*loser_links.length)]} fluid />
    )
    
    //Statistics on who our all time best players are.
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
    
    //Statistics on what the fastest bingo times were.
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
      
    //Creates the Grid for the Player who won the game. Here we will insert the Winner Image function
    //that only Bingo-winners can sen
    Grid_winner = () => (
        <Grid padded>
            <Grid.Row columns={2} textAlign='center' only='computer'> {/*Grid for desktop usage*/}
                <Grid.Column>
                    {this.Image_function_winner()}
                    {this.WinnerLable()}
                    {this.Button_function()} 
                </Grid.Column>
                <Grid.Column>
                    {this.Stats_best_list()}
                    {this.Stats_fastest_games()}
                </Grid.Column>
            </Grid.Row>

            <Grid.Row columns={1} textAlign='center' only='tablet mobile'>{/*Grid for mobile usage*/}
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
    
    //Creates the Grid for all losers of the Bing-Game.
    Grid_loser = () => (
        <div>
            <Grid padded>
                <Grid.Row columns={2} textAlign='center' only='computer'> {/*Grid for desktop usage*/}
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
    
                <Grid.Row columns={1} textAlign='center' only='tablet mobile'> {/*Grid for mobile usage*/}
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
    
    //Writes the Name of our winner onto the screen
    WinnerLable = () => (
        <Header as='h1'>"{this.state.name_winner}" hat das Spiel gewonnen!</Header>
    )
    
    //Creates two buttons for leaving the game or palying again
    Button_function = () => (
        <Grid relaxed padded>
            <Grid.Row columns={2} textAlign='center'>
                <Grid.Column>
                    <Button positive circular onClick={this.play_again}>
                        Erneut spielen
                    </Button>  
                </Grid.Column>

                <Grid.Column>
                    <Button negative circular onClick={this.leave_game}>
                        Spiel verlassen
                    </Button>
                </Grid.Column>
            </Grid.Row>
        </Grid>  
      )
    
/***********************************************************************************/
/***********************************************************************************/

    render()
    { 
        /*WINNER*/
        //here we decide if the user has won the game or not. If he won he will be
        //really lucky to see our rare winner gifs.
        if(this.state.name === this.state.name_winner)
        {
            return (
                <Container className="End">
                    {this.Header_function()} {/*Create Header for Endpage*/}
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