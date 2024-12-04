import React, { useState, useEffect } from 'react';
import { Upload, User, Phone, MapPin, Book, Calendar, FileText } from 'lucide-react';

const StudentRegistrationForm = () => {
  const [formData, setFormData] = useState({
    surname: '',
    firstname: '',
    otherName: '',
    birthday: '',
    gender: '',
    countryCode: '+234',
    phoneNumber: '',
    address: '',
    occupation: '',
    courseOfStudy: '',
    stateOfOrigin: '',
    additionalInfo: '',
    passportPhoto: null
  });


  const [formValid, setFormValid] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(null);

 
  const countryCodes = [
    { code: '+234', country: 'Nigeria' },
    { code: '+1', country: 'United States' },
    { code: '+44', country: 'United Kingdom' },
    { code: '+91', country: 'India' },
    { code: '+86', country: 'China' },
    { code: '+61', country: 'Australia' }
  ];

  useEffect(() => {
    const isValid = 
      formData.surname.trim() !== '' &&
      formData.firstname.trim() !== '' &&
      formData.birthday !== '' &&
      formData.gender !== '' &&
      /^\d{10}$/.test(formData.phoneNumber) && 
      formData.address.trim() !== '' &&
      formData.courseOfStudy.trim() !== '' &&
      formData.stateOfOrigin.trim() !== '' &&
      formData.passportPhoto !== null;

    setFormValid(isValid);
  }, [formData]);

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'phoneNumber') {
      const numericValue = value.replace(/\D/g, '').slice(0, 10);
      setFormData(prevState => ({
        ...prevState,
        [name]: numericValue
      }));
      return;
    }

    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prevState => ({
        ...prevState,
        passportPhoto: file
      }));


      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formValid) {
      console.log('Form submitted:', formData);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-4xl bg-[#6699ff] rounded-2xl shadow-2xl overflow-hidden flex flex-col sm:flex-row">
        <div className="w-full sm:w-1/3 bg-[#6699ff] p-6 flex flex-col items-center justify-center">
          <div className="w-full max-w-[300px] aspect-square mb-4">
            {photoPreview ? (
              <img 
                src={photoPreview} 
                alt="Passport Photo" 
                className="w-full h-full object-cover rounded-2xl shadow-lg"
              />
            ) : (
              <div className="w-full h-full bg-white/20 rounded-2xl flex items-center justify-center">
                <Upload className="text-white w-16 h-16" />
              </div>
            )}
          </div>
          <input
            type="file"
            name="passportPhoto"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
            id="passportPhotoUpload"
            required
          />
          <label 
            htmlFor="passportPhotoUpload" 
            className="mt-4 px-6 py-3 bg-white text-[#6699ff] rounded-lg cursor-pointer hover:bg-gray-100 transition"
          >
            Upload Photo
          </label>
        </div>
        <form 
          onSubmit={handleSubmit} 
          className="w-full sm:w-2/3 p-6 space-y-6 bg-white"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-[#6699ff] mb-6">
            Student Registration
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="relative">
              <User className="absolute left-3 top-3 text-[#6699ff]" />
              <input
                type="text"
                name="surname"
                value={formData.surname}
                onChange={handleChange}
                placeholder="Surname"
                className="w-full pl-10 pr-4 py-3 border-2 border-[#6699ff] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6699ff]"
                required
              />
            </div>
            <div className="relative">
              <input
                type="text"
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
                placeholder="Firstname"
                className="w-full px-4 py-3 border-2 border-[#6699ff] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6699ff]"
                required
              />
            </div>
            <div className="relative">
              <input
                type="text"
                name="otherName"
                value={formData.otherName}
                onChange={handleChange}
                placeholder="Other Name (Optional)"
                className="w-full px-4 py-3 border-2 border-[#6699ff] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6699ff]"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="relative">
              <Calendar className="absolute left-3 top-3 text-[#6699ff]" />
              <input
                type="date"
                name="birthday"
                value={formData.birthday}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border-2 border-[#6699ff] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6699ff]"
                required
              />
            </div>
            <div className="relative">
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-[#6699ff] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6699ff]"
                required
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex space-x-2">
              <div className="relative w-2/5">
                <select
                  name="countryCode"
                  value={formData.countryCode}
                  onChange={handleChange}
                  className="w-full px-2 py-3 border-2 border-[#6699ff] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6699ff]"
                >
                  {countryCodes.map((country) => (
                    <option key={country.code} value={country.code}>
                      {country.code} ({country.country})
                    </option>
                  ))}
                </select>
              </div>
              <div className="relative w-3/5">
                <Phone className="absolute left-3 top-3 text-[#6699ff]" />
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  maxLength="10"
                  className="w-full pl-10 pr-4 py-3 border-2 border-[#6699ff] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6699ff]"
                  required
                />
              </div>
            </div>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 text-[#6699ff]" />
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Address"
                className="w-full pl-10 pr-4 py-3 border-2 border-[#6699ff] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6699ff]"
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="relative">
              <Book className="absolute left-3 top-3 text-[#6699ff]" />
              <input
                type="text"
                name="courseOfStudy"
                value={formData.courseOfStudy}
                onChange={handleChange}
                placeholder="Course of Study"
                className="w-full pl-10 pr-4 py-3 border-2 border-[#6699ff] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6699ff]"
                required
              />
            </div>
            <div className="relative">
              <input
                type="text"
                name="stateOfOrigin"
                value={formData.stateOfOrigin}
                onChange={handleChange}
                placeholder="State of Origin"
                className="w-full px-4 py-3 border-2 border-[#6699ff] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6699ff]"
                required
              />
            </div>
          </div>
          <div className="relative">
            <FileText className="absolute left-3 top-3 text-[#6699ff]" />
            <textarea
              name="additionalInfo"
              value={formData.additionalInfo}
              onChange={handleChange}
              placeholder="Additional Information (Optional)"
              className="w-full pl-10 pr-4 py-3 border-2 border-[#6699ff] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6699ff] min-h-[100px]"
            />
          </div>
          <button
            type="submit"
            disabled={!formValid}
            className={`w-full py-4 rounded-lg text-white text-xl font-bold transition-all duration-300 ${
              formValid 
                ? 'bg-[#6699ff] hover:bg-blue-700 cursor-pointer' 
                : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default StudentRegistrationForm;