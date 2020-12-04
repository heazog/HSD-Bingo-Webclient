import React from 'react';
import data from '../Data';
//import { Divider, Label} from 'semantic-ui-react'; nicht verwendete Objekte auskommentieren oder löschen
import { Header, Button, Image, Table, Grid, Segment, Form} from 'semantic-ui-react';

/* CONSTANTS */
const winner_links = [  'https://media2.giphy.com/media/l4hLwMmFVBOAKF3EI/giphy.gif',
                        'https://media2.giphy.com/media/3o7TKF5DnsSLv4zVBu/giphy.gif',
                        'https://media4.giphy.com/media/9xt1MUZqkneFiWrAAD/giphy.gif?cid=ecf05e47ok4e9gf3hr29te6xlp38lrdt3rmaw9ykmjfq6f1u&rid=giphy.gif'
]

const loser_links = [   'https://media2.giphy.com/media/mcH0upG1TeEak/giphy.gif',
                        'https://media3.giphy.com/media/suCJQGchI6oBW/giphy.gif',
                        'https://media4.giphy.com/media/rKj0oXtnMQNwY/giphy.gif',
                        'https://media2.giphy.com/media/IhL8sICowZWmI/giphy.gif',
                        'https://media3.giphy.com/media/WrNfErHio7ZAc/giphy.gif?cid=ecf05e47ahzzaw2emt1fm7yndu4bk57sehu6kj54pv29gq1d&rid=giphy.gif'
]

/**+*********************************************************************************/

const Header_function = () => (
    <div>
        <Grid columns='equal' divided padded>
            <Grid.Row color='teal' textAlign='center'>
                <Grid.Column>
                    <Segment color='teal' inverted>
                        <Header as='h3'>HSD-BINGO</Header>
                    </Segment>
                </Grid.Column>
                <Grid.Column>
                    <Segment color='teal' inverted>
                        <Header as='h3'>ISE1</Header>
                    </Segment>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    </div>
  )

const Image_function_winner = () => (
    <div>
        <Image src={winner_links[Math.floor(Math.random()*winner_links.length)]} fluid />
    </div>
)

const Image_function_loser = () => (
    <div>
        <Image src={loser_links[Math.floor(Math.random()*loser_links.length)]}fluid />
    </div>
)

const Stats_best_list = () => (
    <div>
        <Table color={'teal'} key={'teal'}>
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
    </div>
)

const Stats_fastest_games = () => (
    <div>
        <Table color={'teal'} key={'teal'}>
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
    </div>
)
  

const Grid_winner = () => (
    <div>
        <Grid padded>
            <Grid.Row columns={2} textAlign='center' only='computer'> {/* padded is bei Row ned erlaubt */}
                <Grid.Column>
                    {Image_function_winner()}
                    {WinnerLable()}
                </Grid.Column>
                <Grid.Column>
                    {Stats_best_list()}
                    {Stats_fastest_games()}
                </Grid.Column>
            </Grid.Row>

            <Grid.Row columns={1} textAlign='center' only='tablet mobile'>
                <Grid.Column>
                    {Image_function_winner()}
                </Grid.Column>
            </Grid.Row>

            <Grid.Row columns={1} textAlign='center' only='tablet mobile'>
                <Grid.Column>
                    {WinnerLable()}
                </Grid.Column>
            </Grid.Row>

            <Grid.Row columns={1} textAlign='center' only='tablet mobile'>
                <Grid.Column>
                    {Stats_best_list()}  
                </Grid.Column>
            </Grid.Row>

            <Grid.Row columns={1} textAlign='center' only='tablet mobile'>
                <Grid.Column>
                    {Stats_fastest_games()}  
                </Grid.Column>
            </Grid.Row>
        </Grid>
    </div>
)

const Grid_loser = () => (
    <div>
        <Grid padded>
            <Grid.Row columns={2} textAlign='center' only='computer'>
                <Grid.Column>
                    {Image_function_loser()}
                    {WinnerLable()}
                    {Button_function()} 
                </Grid.Column>
                <Grid.Column>
                    {Stats_best_list()}
                    {Stats_fastest_games()}
                </Grid.Column>
            </Grid.Row>

            <Grid.Row columns={1} textAlign='center' only='tablet mobile'>
                <Grid.Column>
                    {Image_function_loser()}
                </Grid.Column>
            </Grid.Row>

            <Grid.Row columns={1} textAlign='center' only='tablet mobile'>
                <Grid.Column>
                    {WinnerLable()}
                </Grid.Column>
            </Grid.Row>

            <Grid.Row columns={1} textAlign='center' only='tablet mobile'>
                <Grid.Column>
                    {Stats_best_list()}  
                </Grid.Column>
            </Grid.Row>

            <Grid.Row columns={1} textAlign='center' only='tablet mobile'>
                <Grid.Column>
                    {Stats_fastest_games()}  
                </Grid.Column>
            </Grid.Row>

            <Grid.Row columns={1} textAlign='center' only='tablet mobile'>
                <Grid.Column>
                    {Button_function()}  
                </Grid.Column>
            </Grid.Row>
        </Grid>
    </div>
)

const WinnerLable = () => (
    <Form>
      <Form.Field>
        <input type='text' placeholder='Winner Name' />
      </Form.Field>
    </Form>
)

const Button_function = () => (
    <div>
        <Grid>
            <Grid.Row columns={2} textAlign='center'>{/* relaxed & padded is bei Row ungültig - gehört des ins <Grid>?*/}
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

/**+*********************************************************************************/

class End extends React.Component 
{
    constructor(props) {
        super(props);
        this.state = {
          play_again: [],
          error: false
        };

        this.play_again = this.play_again.bind(this);
      }
    
    async play_again(){
        let play_again = await data.joinLobby();
        
        if(play_again === null){
           this.setState({error: true})
        }else{
           this.setState({play_again: play_again, error: false});
        }
    }

    render()
    { 
        /*WINNER*/
        if(false)
        {
            return (
                <div>
                    {Header_function() /* h3, form usw. darf ned innerhalb von <p> sein, hab jetzt alle entfernt - vielleicht war des zu viel, aber bitte zukünfig auf die warnings achten :)*/}
                    {Grid_winner()}
                </div>
                );
        }
        /*LOSER*/
        else
        {
            return (
                <div>
                    {Header_function()}
                    {Grid_loser()}
                </div>
                );
            }
    }
}
export default End;