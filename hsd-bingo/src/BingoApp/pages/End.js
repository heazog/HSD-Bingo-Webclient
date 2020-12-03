import React from 'react';
import { Header, Button, Image, Table, Grid, Segment, Divider, Form, Label} from 'semantic-ui-react';

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

const Image_function = () => (
    <Image src='https://823018.smushcdn.com/1622763/wp-content/uploads/2017/06/Winner.jpg?lossy=1&strip=1&webp=1' fluid/>
  )

const Button_function = () => (
    <div>
        <Grid>
            <Grid.Row relaxed columns={2} padded textAlign='center'>
                <Grid.Column>
                    <Button color='teal'>
                        <Header as='h4'>Erneut spielen</Header>
                    </Button>  
                </Grid.Column>
                <Grid.Column>
                    <Button color='teal'>
                        <Header as='h4'>Spiel verlassen</Header>
                    </Button>
                </Grid.Column>
            </Grid.Row>
        </Grid>
      
      
    </div>
  )

 const Stats_function = () => (
    <div>
        <Table color={'teal'} key={'teal'} inverted>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Spielstatistik</Table.HeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                <Table.Row>
                    <Table.Cell>Beste Reihe in #208 (alle Teilnehmer)</Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell>(Unterschiedliche) gezogene Zahlen in #208</Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell>Meine Reihen in #208</Table.Cell>        
                </Table.Row>
            </Table.Body>
    </Table>
  </div>
)

const WinnerLable = () => (
    <Form>
      <Form.Field>
        <input type='text' placeholder='Winner Name' />
      </Form.Field>
    </Form>
)
  

const Image_Stats_Grid = () => (
    <div>
        <Grid divided='vertically' padded>
            <Grid.Row columns={2} padded textAlign='center' only='computer'>
                <Grid.Column>
                    <p>{Image_function()}</p>
                    <p>{WinnerLable()}</p>
                </Grid.Column>
                <Grid.Column>
                    <p>{Stats_function()}</p>
                </Grid.Column>
            </Grid.Row>

            <Grid.Row columns={1} textAlign='center' only='tablet mobile'>
                <Grid.Column>
                    <p>{Image_function()}</p>
                </Grid.Column>
            </Grid.Row>

            <Grid.Row columns={1} textAlign='center' only='tablet mobile'>
                <Grid.Column>
                    <p>{WinnerLable()}</p>
                </Grid.Column>
            </Grid.Row>

            <Grid.Row columns={1} textAlign='center' only='tablet mobile'>
                <Grid.Column>
                    <p>{Stats_function()}</p>  
                </Grid.Column>
            </Grid.Row>
        </Grid>
    </div>
)

class End extends React.Component {

    render(){
        return (
            <div>
                <p>{Header_function()}</p>
                <p>{Image_Stats_Grid()}</p>
                <p>{Button_function()}</p>
            </div>
          );
    }
}
export default End;