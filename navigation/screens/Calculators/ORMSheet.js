import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';

export default function ORMSheet()
{
    return (
        <View style={styles.container}>
          <Grid>
            <Col size={25}>
            <Row style={styles.cellLT}>
                <Text>Repetition(s)</Text>
              </Row>
              <Row style={styles.cell}>
                <Text>1</Text>
              </Row>
              <Row style={styles.cell}>
                <Text>2</Text>
              </Row>
              <Row style={styles.cell}>
                <Text>3</Text>
              </Row>
              <Row style={styles.cell}>
                <Text>4</Text>
              </Row>
              <Row style={styles.cell}>
                <Text>5</Text>
              </Row>
              <Row style={styles.cell}>
                <Text>6</Text>
              </Row>
              <Row style={styles.cell}>
                <Text>7</Text>
              </Row>           
              <Row style={styles.cellLB}>
                <Text>8</Text>
              </Row>
            </Col>
            <Col size={25}>
            <Row style={styles.cellRT}>
                <Text>% of 1RM</Text>
              </Row>
              <Row style={styles.cell}>
                <Text>100</Text>
              </Row>
              <Row style={styles.cell}>
                <Text>95</Text>
              </Row>
              <Row style={styles.cell}>
                <Text>93</Text>
              </Row>
              <Row style={styles.cell}>
                <Text>90</Text>
              </Row>
              <Row style={styles.cell}>
                <Text>87</Text>
              </Row>
              <Row style={styles.cell}>
                <Text>85</Text>
              </Row>
              <Row style={styles.cell}>
                <Text>83</Text>
              </Row>
              <Row style={styles.cellRB}>
                <Text>80</Text>
              </Row>
            </Col>
          </Grid>
        </View>
      );
    }
    
    const styles = StyleSheet.create({
      container: {
        width: '100%',
        height: '55%',
        padding: 6,
        paddingTop: 30,
        maxWidth: 400,
        alignSelf:'center'
      },
      cell: {
        borderWidth: 1,
        borderColor: 'black',
        fontSize: 20,
        flex: 1, 
        justifyContent: 'center',
        alignItems: 'center'
      },
      cellLT: {
        borderWidth: 1,
        borderColor: 'black',
        borderTopLeftRadius: 10,
        flex: 1, 
        justifyContent: 'center',
        alignItems: 'center'
      },
      cellRT: {
        borderWidth: 1,
        borderColor: 'black',
        borderTopRightRadius: 10,
        flex: 1, 
        justifyContent: 'center',
        alignItems: 'center'
      },
      cellLB: {
        borderWidth: 1,
        borderColor: 'black',
        borderBottomLeftRadius: 10,
        flex: 1, 
        justifyContent: 'center',
        alignItems: 'center'
      },
      cellRB: {
        borderWidth: 1,
        borderColor: 'black',
        borderBottomRightRadius: 10,
        flex: 1, 
        justifyContent: 'center',
        alignItems: 'center'
      },
    });