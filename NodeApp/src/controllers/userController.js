const controller = {};

controller.list = (req, res) => {
    res.render('usuarios');
}

controller.save = (req, res) => {
    console.log(req.body);
    const data = req.body;
    console.log("-------------");
    console.log(data);
    req.getConnection((err, conn) => {
        conn.query('INSERT INTO user set ?',[data], (err, rows) => {
            console.log(rows);
            return res.status(200).send({
                rows
            });
        });
    });
}

controller.login = (req, res) => {

    req.getConnection((err, conn) =>{

        conn.query('Select id, username, password FROM user where username = ?', [req.body.username],(err, usuarios) => {
            if(err)
            {
                res.json(err);
            }
            console.log(usuarios);
            let ok = "ok";
            if(usuarios[0].username == req.body.username && usuarios[0].password == req.body.password)
            {
                res.status(200).send(usuarios[0].id);
                console.log(usuarios[0].id);
                let user_id = usuarios[0].id;
                console.log("entro a la condicion de cristian");
                return res.status(200).send({ user_id });
            }
            else
            {
                console.log('Contraseña Error');
                return res.status(400).send('Contraseña Erronea');
            }

        });
     });
     
}

controller.delete = (req, res) => {

    const id = req.body.id;
    console.log(req.body);

    req.getConnection((err,conn) => {
        conn.query('Delete From user where id = ?', [id], (err, rows) => {
            console.log('Usuario Eliminado');
        });
    });
}

controller.update = (req, res) => {
    
}

controller.getRecommendations = (req, res) => {
    const id = req.params.id;
    req.getConnection((err, conn) => {
        conn.query('Select * FROM recommendations where userid = ?', [id],(err, recomendaciones) => {
            if(err)
            {
                res.json(err);
            }

            console.log('mensaje x');
            console.log(recomendaciones);
            console.log(recomendaciones.length);

            return res.status(200).send({ recomendaciones });
            
        

        });
    });
}

controller.insertRecommendation = (req, res) => {
    
    console.log(req.body);
    const data = req.body;
    console.log("-------------");
    console.log(data);
    req.getConnection((err, conn) => {
        conn.query('INSERT INTO recommendations set ?',[data], (err, rows) => {
            console.log(rows);
            //res.send('works');
            return res.status(200).send({rows});
            });
        });
    }



module.exports = controller;