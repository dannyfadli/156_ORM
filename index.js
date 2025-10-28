const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('./models');
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
});

db.sequelize.sync().then(() => {
    app.listen(PORT, () => {    
        console.log('Server Started');
    })
})
    .catch((err) => {
        console.log('Error: ' + err);
})

app.post('/komik', async (req, res) => {
    const data =req.body;
    try {
        const komik = await db.Komik.create(data);
        res.send(komik);
    } catch (error) {
        res.status(500).send({message: error.message});
    }
});

app.get('/komik', async (req, res) => {
    try {
        const komik = await db.Komik.findAll();
        res.send(komik);
    } catch (error) {
        res.status(500).send({message: error.message});
    }
});

app.put('/komik/:id', async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    try {
        const komik = await db.Komik.findByPk(id);
        if(!komik){
            return res.status(404).send({message: 'Komik not found'});
        }
        await komik.update(data);
        res.send({masage: 'Komik berhasil di update', komik});
    } catch (error) {
        res.status(500).send({message: error.message});
    }
});

app.delete('/komik/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const komik = await db.Komik.findByPk(id);
        if(!komik){
            return res.status(404).send({message: 'Komik not found'});
        }
        await komik.destroy();
        res.send({message: 'Komik berhasil dihapus'});
    } catch (error) {
        res.status(500).send({message: error.message});
    }   
});
