import React from 'react';
import data from '../Data';
import { Header, Button, Image, Table, Grid, Container} from 'semantic-ui-react';
import logo from "../../logo.png"

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
            highscore_player: [],
            highscore_lva: [],
            error: false
        };

        this.play_again = this.play_again.bind(this);
        this.leave_game = this.leave_game.bind(this);        
    }

    componentDidMount(){
        this.get_subject();
        this.get_User();
        this.get_Winner();
        this.get_highscores();
    }

    //Get played subject. For example ISE1
    get_subject(){
        let lobby_name = data.getLobby();

        if(lobby_name === null){
            this.setState({error: true});
        }else{
            this.setState({subject: lobby_name, error: false});
        }
    }

    get_User(){
        let userName = data.getUser();
        
        if(userName === null){
            this.setState({error: true});
        }else{
            this.setState({name: userName, error: false});
        }
    }

    //Who won the game?
    get_Winner(){
        let winner = data.getWinner();

        if(winner === null){
            this.setState({error: true});
        }else{
            this.setState({name_winner: winner, error: false});
        }
    }

    //Get the all time best players
    async get_highscores(){
        let highscore = await data.highscores();

        this.setState({highscore_player: highscore.bestplayers, highscore_lva: highscore.quickestlobbies});
    }

    //Back to Lobby Screen
    async play_again(){
        await data.joinLobby(this.state.subject, this.state.name);
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
        <Grid columns='equal' padded verticalAlign='middle'>
            <Grid.Row textAlign='center'>
                <Grid.Column> 
                    <Image centered src={logo} size='tiny' />
                </Grid.Column>
                <Grid.Column>
                        <Header as='h1'>{this.state.subject}</Header>
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
        <Table color={'teal'} key={'teal1'} unstackable celled>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Name</Table.HeaderCell>
                    <Table.HeaderCell>Score</Table.HeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                {this.state.highscore_player.map((player, index) => { 
                        return(
                            <Table.Row key={index}>
                                <Table.Cell>{player.name}</Table.Cell>
                                <Table.Cell>{player.score}</Table.Cell>
                            </Table.Row>
                        )
                    })
                }
            </Table.Body>
        </Table>
    )
    
    //Statistics on what the fastest bingo times were.
    Stats_fastest_games = () => (
        <Table color={'teal'} key={'teal2'} celled unstackable>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Lehrveranstaltung</Table.HeaderCell>
                    <Table.HeaderCell>Spielzeit</Table.HeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                {this.state.highscore_lva.map((time, index) => { 
                    var gametime = 0;
                    var date = new Date(0);
                    date.setSeconds(time.gametime); // specify value for SECONDS here
                    if(date !== 0)
                    {
                        var timeString = date.toISOString().substr(11, 8);
                        gametime = timeString 
                    }

                        return(
                            <Table.Row key={index}>
                                <Table.Cell>{time.lobby}</Table.Cell>
                                <Table.Cell>{gametime}</Table.Cell>
                            </Table.Row>
                        )
                    })
                }
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

            <Grid.Row columns={1} textAlign='center' only='tablet mobile'>
                    <Grid.Column>
                        {this.Button_function()}  
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