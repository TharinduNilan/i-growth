import React, { useEffect, useState } from 'react';
import './BabyDetails.scss'
import { AiFillCloseCircle } from 'react-icons/ai'
import instance from '../../../utility/AxiosInstance'


const GetVaccine = (props) => {

    const [vaccine, setVaccine] = useState(null);
    const [trigger, setTrigger] = useState(false);

    const childID = props.childID;

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await instance.get(`midwife/child/vaccine/${childID}`);
                setVaccine(res.data)
                console.log(res.data);
            }
            catch (err) {
                console.log(err)
            }
        }
        getData()
    }, [childID, trigger])

    const makeAsTaken = async (time_table_id, vaccine_id) => {
        console.log(time_table_id, vaccine_id);

        // Ask yes no question from user to make as taken confirm
        const userConfirmation = window.confirm("Are you sure you want to make as taken?");

        if (userConfirmation) {
            try {
                const res = await instance.post(`/midwife/child/vaccine/${childID}/${time_table_id}/${vaccine_id}`);
                console.log(res.data);
                setTrigger(!trigger);
                alert("Successfully made as taken")
            }
            catch (err) {
                console.log(err);
                alert("Can't make as taken")
            }
        }

    }

    if (vaccine !== null) return (
        <div className='vaccine-card-fram'>
            {vaccine.map((data, index) => (
                <div className='vaccine-fram' key={index} style={data.status === "eligible" ? { background: '#98fb98' } : data.status === "not_eligible" ? { background: '#dcdcdc' } : data.status === "taken" ? { background: '#6495ed' } : null}>
                    <p className='vaccine_name'>{data.vaccine_name}</p>
                    {
                        data.status === "eligible" && <button onClick={() => makeAsTaken(data.time_table_id, data.vaccine_id)}>Make as taken</button>
                    }
                </div>
            ))}
        </div>

    )
}

export default function BabyDetails() {

    const month = [
        { month: '2M', no: 2 },
        { month: '4M', no: 4 },
        { month: '6M', no: 6 },
        { month: '9M', no: 9 },
        { month: '12M', no: 12 },
        { month: '18M', no: 18 },
        { month: '24M', no: 24 },
        { month: '36M', no: 36 },
        { month: '48M', no: 48 },
        { month: '60M', no: 60 },
    ]

    const vaccine = [
        { vaccine: 'Vaccine 1' },
        { vaccine: 'Vaccine 2' },
        { vaccine: 'Vaccine 3' },
        { vaccine: 'Vaccine 4' },
        { vaccine: 'Vaccine 5' },
        { vaccine: 'Vaccine 6' },
        { vaccine: 'Vaccine 7' },
        { vaccine: 'Vaccine 8' },
        { vaccine: 'Vaccine 9' },
        { vaccine: 'Vaccine 10' },
        { vaccine: 'Vaccine 11' },
        { vaccine: 'Vaccine 12' },
        { vaccine: 'Vaccine 13' },
        { vaccine: 'Vaccine 14' },
        { vaccine: 'Vaccine 15' },
        { vaccine: 'Vaccine 16' },
    ]

    const data = [
        { id: '1', no: "01", child_id: "10", childl_name: "01", age: '04', gender: '01', gurdient_name: 'father', mobile: '0123456789' },
        { id: '2', no: "02", child_id: "10", childl_name: "02", age: '04', gender: '01', gurdient_name: 'father', mobile: '0123456789' },
        { id: '3', no: "03", child_id: "10", childl_name: "03", age: '04', gender: '01', gurdient_name: 'father', mobile: '0123456789' },
        { id: '4', no: "04", child_id: "10", childl_name: "04", age: '04', gender: '01', gurdient_name: 'father', mobile: '0123456789' },
        { id: '5', no: "05", child_id: "10", childl_name: "05", age: '04', gender: '01', gurdient_name: 'father', mobile: '0123456789' },
        { id: '6', no: "06", child_id: "10", childl_name: "06", age: '04', gender: '01', gurdient_name: 'father', mobile: '0123456789' },
        { id: '7', no: "07", child_id: "10", childl_name: "07", age: '04', gender: '01', gurdient_name: 'father', mobile: '0123456789' },
        { id: '8', no: "08", child_id: "10", childl_name: "08", age: '04', gender: '01', gurdient_name: 'father', mobile: '0123456789' },
        { id: '9', no: "09", child_id: "10", childl_name: "09", age: '04', gender: '01', gurdient_name: 'father', mobile: '0123456789' },
    ]

    const [showDetail, setShowDetail] = useState(false);

    const [selectedBaby, setSelectedBaby] = useState(null);

    const [apiData, setApiData] = useState([]);

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedMonth, setSelectedMonth] = useState(2);

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await instance.get('/parent/child');
                setApiData(res.data);
            }
            catch (err) {
                console.log(err)
            }
        }
        getData()
    }, [])

    const handleViewDetail = (babyDetail) => {
        setSelectedBaby(babyDetail);
        setShowDetail(true);
    }

    const handleCloseViewDetail = () => {
        setSelectedBaby(null);
        setShowDetail(false);
    }

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };


    if (apiData !== null) return (
        <div className='baby-details-container'>
            <div className='babyDetail-top'>
                <div className='searchbar'>
                    <input type="number" placeholder="Search.." name="search" className='search' value={searchQuery} onChange={handleSearchChange} />
                </div>
            </div>
            <div className='babyDetail-bottom'>
                <table>
                    <thead>
                        <tr>
                            <td>No</td>
                            <td>Child ID</td>
                            <td>Child Name</td>
                            <td>Birthday</td>
                            <td>Gender</td>
                            <td>Gardiant Name</td>
                            <td>Mobile</td>
                            <td>More</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            apiData.map((data, index) => {
                                if ((data.child_id.toString().includes(searchQuery.toLowerCase()))) {
                                    return (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{data.child_id}</td>
                                            <td>{data.child_name}</td>
                                            <td>{data.child_birthday.split('T')[0]}</td>
                                            <td>{data.child_gender}</td>
                                            <td>{data.guardian_name}</td>
                                            <td>{data.phone}</td>
                                            <td className='crud-btn'>
                                                <div className='top-detail' onClick={() => handleViewDetail(data)} >View Detail</div>
                                                {/* <div className='bottom-detail'>
                                                <div className='update'>Update</div>
                                                <div className='delete'>Delete</div>
                                                </div> */}
                                            </td>

                                            {showDetail && selectedBaby && selectedBaby.child_id === data.child_id && (
                                                <div className='babyDetail-view-container'>
                                                    <div className="cardView">
                                                        <div className="close-icon"><AiFillCloseCircle size={25} color='red' className='icon' onClick={handleCloseViewDetail} /></div>
                                                        <div className="card-section">
                                                            <div className='top-section'>
                                                                <h3>Details:</h3>
                                                                <div className='detail-body'>
                                                                    <div className='detail'><h4>Children ID :</h4>{data.child_id}</div>
                                                                    <div className='detail'><h4>Name :</h4>{data.child_name}</div>
                                                                    <div className='detail'><h4>Birthday :</h4>{data.child_birthday.split('T')[0]}</div>
                                                                    <div className='detail'><h4>Gender :</h4>{data.child_gender}</div>
                                                                    <div className='detail'><h4>Gudiunt Name :</h4>{data.guardian_name}</div>
                                                                    <div className='detail'><h4>Address :</h4>{data.address}</div>
                                                                    <div className='detail'><h4>Gudiunt Mobile :</h4>{data.phone}</div>
                                                                    <div className='detail'><h4>Bron Weight :</h4>{data.child_born_weight}</div>
                                                                    {/* <div className='detail'><h4>BMI :</h4>---</div>
                                                        <div className='detail'><h4>Stage :</h4>----</div> */}
                                                                </div>
                                                            </div>
                                                            <hr style={{ width: '1200px' }} />
                                                            <div className='bottom-section'>
                                                                <div className='bottom-left'>
                                                                    <h3>Vaccine Detail</h3>
                                                                    <GetVaccine childID={data.child_id} />

                                                                </div>
                                                                <hr style={{ height: '400px' }} />
                                                                <div className='bottom-right'>
                                                                    <h3>Development Activites</h3>
                                                                    <div className='development-activites-top'>
                                                                        {month.map((data, index) => (
                                                                            <div className={selectedMonth === data.no ? 'month-fram active' : 'month-fram'} key={index} onClick={() => setSelectedMonth(data.no)}>
                                                                                <p>{data.month}</p>
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                    <div className='development-activites-bottom'>
                                                                        <DevelopmentActivityTable childID={data.child_id} selectedMonth={selectedMonth} />
                                                                        <div className='button'>
                                                                            <input className='input-field' type='text' name='comment' placeholder='Enter Comment Here' />
                                                                            <input className='submit-btn' type="submit" value="Send" />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </tr>
                                    )
                                }
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

const DevelopmentActivityTable = (props) => {
    const child_id = props.childID;
    const selected_month = props.selectedMonth;

    const [activity, setActivity] = useState([]);

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await instance.get(`/midwife/activity/${child_id}`);
                console.log(res.data);
                setActivity(res.data);
            }
            catch (err) {
                console.log(err)
            }
        }
        getData()
    }, [child_id, selected_month])

    if (activity.length < 1) return (
        <p>No Activities</p>
    )

    return (
        <table style={{ width: '80%', height: '20px' }}>
            {
                activity.map((data, index) => {
                    if (data.activity_month === selected_month) return (
                        <tr key={index}>
                            <td className='number'>{index + 1}</td>
                            <td>{data.activity_name}</td>
                        </tr>
                    )
                    return null
                })
            }
        </table>
    )
}