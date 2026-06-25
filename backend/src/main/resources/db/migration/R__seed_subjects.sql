-- Repeatable seed of default subjects. Re-runs whenever its checksum changes.
-- Idempotent: ON CONFLICT keeps existing rows untouched.

INSERT INTO subjects (name, code) VALUES
    ('Mathematics',        'MATH'),
    ('Physics',            'PHY'),
    ('Chemistry',          'CHEM'),
    ('Biology',            'BIO'),
    ('Computer Science',   'CS'),
    ('Data Structures',    'DSA'),
    ('Operating Systems',  'OS'),
    ('Databases',          'DBMS'),
    ('Economics',          'ECON'),
    ('English Literature', 'ENG')
ON CONFLICT (lower(name)) DO NOTHING;
