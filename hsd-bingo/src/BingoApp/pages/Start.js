import React from 'react';
import { Button, Dropdown, Header, Input, Grid } from 'semantic-ui-react';

const SemesterOptions = [
    {key: 'HSD1', text: 'HSD Semester 1'},
    {key: 'HSD2', text: 'HSD Semester 2'},
    {key: 'HSD3', text: 'HSD Semester 3'},
    {key: 'HSD4', text: 'HSD Semester 4'},
    {key: 'HSD5', text: 'HSD Semester 5'},
    {key: 'ESD1', text: 'ESD Semester 1'},
    {key: 'ESD2', text: 'ESD Semester 2'},
    {key: 'ESD3', text: 'ESD Semester 3'},
]

var SubjectOptions = [
    {key: 'DIG1', text: 'DIG1'}, // Sowas braucht immer ein Key -> sonst warning
    {key: 'SEN1', text: 'SEN1'},
    {key: 'CEC1', text: 'CEC1'},
]

class Headline extends React.Component {
    render(){
        return (
            <Header as='h1'>HSD - BINGO</Header>
        );
    }
}

class Namefield extends React.Component {
    render(){
        return (
            <Input focus placeholder='Benutzername' />
        );
    }
}

class Semester extends React.Component {
    render(){
        return (
            <Dropdown
            placeholder='Semester Wählen'
            selection
            options={SemesterOptions}
            />
        );
    }
}

class Subjects extends React.Component {
    render(){
        return(
            <Dropdown
            placeholder='Fach Wählen'
            selection
            options={SubjectOptions}
            />
        );
    }
}

class Submit extends React.Component {
    render(){
        return(
            <Button primary>Start</Button>
        )
    }
}

class Start extends React.Component {
    render(){
        return (<Grid centered>
                    <Headline />
                    <Grid.Row> <Namefield /> </Grid.Row>
                    <Grid.Row> <Semester /> </Grid.Row>
                    <Grid.Row> <Subjects />  </Grid.Row>
                    <Grid.Row> <Submit /> </Grid.Row>
                </Grid>
          );
    }
}

export default Start;