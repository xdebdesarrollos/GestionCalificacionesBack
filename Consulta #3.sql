INSERT INTO `sit_revista` (`nombre_sr`) 
VALUES 
('Titular'),
('Interino'),
('Suplente');


SELECT u.nombre_usr, p.nombre, p.apellido, p.email, u.psw_usr
FROM usuario u INNER JOIN persona p ON u.id_pers = p.id_pers AND u.nombre_usr = 'admin';