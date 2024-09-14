const { json } = require('body-parser');
const con = require('./config');
const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
con.connect((err)=>{
    if(err){ 
        console.log("error is found");
    }
    else{
        console.log("connected to the database");
    }
    })
   app.post('/user_create', (req, res) => {
        const { name, email, password } = req.body;

        const query = "INSERT INTO users (name, email, password ) VALUES (?, ?, ?)";
        con.query(query, [name, email, password], (error, result) => {
            if (error) {
                console.error('Error inserting data: ' + error.message);
                res.status(500).send('Error inserting data');
                return;
            }
            console.log('Data inserted successfully');
            res.status(200).send('Data inserted successfully');
         
        });
    });
    app.post('/create_project', (req, res) => {
        const { title, description, goal } = req.body;

        const query = "INSERT INTO project (title, description, goal ) VALUES (?, ?, ?)";
        con.query(query, [title, description, goal ], (error, result) => {
            if (error) {
                console.error('Error inserting data: ' + error.message);
                res.status(500).send('Error inserting data');
                return;
            }
            console.log('Data inserted successfully');
            res.status(200).send('Data inserted successfully');
         
        });
    });
    app.get('/get_project', (req, res) => {
        const query = "SELECT * FROM project";
        con.query(query, (error, result) => {
            if (error) {
                console.error('Error geting data: ' + error.message);
                res.status(500).send('Error geting data');
                return;
            }
            console.log('Data get successfully');
            res.status(200).send(result);
         
        });
    });
    app.post('/project_posts', (req, res) => {
        const { title, description, projectId } = req.body;

        const query = "INSERT INTO project_posts (title, description, project_id ) VALUES (?, ?, ?)";
        con.query(query, [title, description, projectId ], (error, result) => {
            if (error) {
                console.error('Error inserting data: ' + error.message);
                res.status(500).send('Error inserting data');
                return;
            }
            console.log('Data inserted successfully');
            res.status(200).send('Data inserted successfully');
         
        });
    });


    app.get('/get_project_by_id/:id', (req, res) => {
        const projectId = req.params.id;
        const query = `SELECT * FROM project WHERE id = ?`;
      
        con.query(query, [projectId], (error, result) => {
          if (error) {
            console.error('Error getting data: ' + error.message);
            res.status(500).send('Error getting data');
            return;
          }
          console.log('Data retrieved successfully');
          res.status(200).json(result[0]); 
        });
      });
      
      app.get('/get_post_by_id/:id', (req, res) => {
        const projectId = req.params.id;
        const query = `SELECT * FROM project_posts WHERE project_id = ?`;
      
        con.query(query, [projectId], (error, result) => {
          if (error) {
            console.error('Error getting data: ' + error.message);
            res.status(500).send('Error getting data');
            return;
          }
        //   console.log(result);
          console.log('Data retrieved successfully');
          res.status(200).json(result);
        });
      });
      

    app.listen(5000);