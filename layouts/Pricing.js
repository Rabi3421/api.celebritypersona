import Link from "next/link";
import Cta from "./components/Cta";

function Pricing({ data }) {
  const {
    frontmatter: { title, plans, call_to_action },
  } = data;
  
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 py-20">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full blur-3xl"></div>
          <div className="absolute top-32 right-0 w-96 h-96 bg-gradient-to-br from-purple-400 to-pink-600 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container relative z-10">
          {/* Hero Section */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-6">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Transparent Pricing • No Hidden Fees
            </div>
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-6">
              Simple, Fair Pricing
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Start free, scale effortlessly. Our pricing grows with you - from hobbyist to enterprise.
              <br />
              <span className="text-blue-600 font-semibold">Pay only for what you use.</span>
            </p>
          </div>

          {/* Pricing Toggle */}
          <div className="flex justify-center mb-16">
            <div className="bg-white rounded-2xl p-2 shadow-lg border border-gray-200">
              <div className="flex items-center space-x-1">
                <button className="px-6 py-3 rounded-xl bg-blue-600 text-white font-medium text-sm transition-all">
                  Monthly
                </button>
                <button className="px-6 py-3 rounded-xl text-gray-600 font-medium text-sm hover:text-gray-900 transition-all">
                  Annual
                  <span className="ml-2 px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">Save 20%</span>
                </button>
              </div>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="max-w-7xl mx-auto">
            {/* First Row - 3 Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              {plans.slice(0, 3).map((plan, index) => {
                const isPopular = plan.recommended;
                const isFree = plan.price === 0;
                const isEnterprise = plan.price === "Custom";
                
                return (
                  <div
                    key={plan.title + index}
                    className={`relative group ${
                      isPopular ? "lg:scale-110 lg:-mt-8 z-20" : "z-10"
                    }`}
                  >
                    {/* Popular Badge */}
                    {isPopular && (
                      <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-30">
                        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                          <span className="flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            Most Popular
                          </span>
                        </div>
                      </div>
                    )}

                    <div className={`relative h-full bg-white rounded-3xl p-8 transition-all duration-500 group-hover:shadow-2xl ${
                      isPopular 
                        ? "shadow-2xl ring-2 ring-blue-500 ring-offset-4 bg-gradient-to-b from-white to-blue-50" 
                        : "shadow-lg hover:shadow-xl border border-gray-100 hover:border-blue-200"
                    }`}>
                      
                      {/* Card Header */}
                      <div className="text-center mb-8">
                        <div className={`inline-flex p-3 rounded-2xl mb-4 ${
                          isFree ? "bg-green-100" :
                          isEnterprise ? "bg-purple-100" :
                          isPopular ? "bg-gradient-to-br from-blue-100 to-purple-100" :
                          "bg-gray-100"
                        }`}>
                          {isFree ? (
                            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                            </svg>
                          ) : isEnterprise ? (
                            <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                          ) : (
                            <svg className={`w-8 h-8 ${isPopular ? "text-blue-600" : "text-gray-600"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                          )}
                        </div>
                        
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.title}</h3>
                        <p className="text-gray-600 text-sm">{plan.subtitle}</p>
                      </div>

                      {/* Price */}
                      <div className="text-center mb-8">
                        {isFree ? (
                          <div className="text-5xl font-bold text-gray-900 mb-2">Free</div>
                        ) : isEnterprise ? (
                          <div className="text-4xl font-bold text-gray-900 mb-2">Let's Talk</div>
                        ) : (
                          <div className="mb-2">
                            <div className="flex items-baseline justify-center">
                              <span className="text-2xl font-semibold text-gray-500">{plan.currency}</span>
                              <span className="text-5xl font-bold text-gray-900">{plan.price.toLocaleString()}</span>
                            </div>
                            {plan.usd_price && (
                              <div className="text-sm text-gray-500 mt-1">{plan.usd_price} USD</div>
                            )}
                          </div>
                        )}
                        {!isEnterprise && (
                          <div className="text-gray-500 text-sm">per month</div>
                        )}
                      </div>

                      {/* Features */}
                      <div className="space-y-4 mb-8 flex-grow">
                        {plan.features.map((feature, idx) => (
                          <div key={idx} className="flex items-start">
                            <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5 mr-3 ${
                              isPopular ? "bg-blue-100" : "bg-green-100"
                            }`}>
                              <svg className={`w-3 h-3 ${isPopular ? "text-blue-600" : "text-green-600"}`} fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <span className="text-gray-700 text-sm leading-relaxed">{feature}</span>
                          </div>
                        ))}
                      </div>

                      {/* CTA Button */}
                      <Link
                        href={plan.button.link}
                        className={`block w-full py-4 px-6 rounded-2xl font-semibold text-center transition-all duration-300 transform hover:scale-105 ${
                          isPopular
                            ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-purple-700"
                            : isFree
                            ? "bg-green-600 text-white hover:bg-green-700 shadow-lg hover:shadow-xl"
                            : isEnterprise
                            ? "bg-purple-600 text-white hover:bg-purple-700 shadow-lg hover:shadow-xl"
                            : "bg-gray-900 text-white hover:bg-gray-800 shadow-lg hover:shadow-xl"
                        }`}
                      >
                        {plan.button.label}
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
            
            {/* Second Row - Remaining Cards (Centered) */}
            {plans.length > 3 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {plans.slice(3).map((plan, index) => {
                  const actualIndex = index + 3;
                  const isPopular = plan.recommended;
                  const isFree = plan.price === 0;
                  const isEnterprise = plan.price === "Custom";
                  
                  return (
                    <div
                      key={plan.title + actualIndex}
                      className={`relative group ${
                        isPopular ? "lg:scale-110 lg:-mt-8 z-20" : "z-10"
                      }`}
                    >
                      {/* Popular Badge */}
                      {isPopular && (
                        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-30">
                          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                            <span className="flex items-center">
                              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                              Most Popular
                            </span>
                          </div>
                        </div>
                      )}

                      <div className={`relative h-full bg-white rounded-3xl p-8 transition-all duration-500 group-hover:shadow-2xl ${
                        isPopular 
                          ? "shadow-2xl ring-2 ring-blue-500 ring-offset-4 bg-gradient-to-b from-white to-blue-50" 
                          : "shadow-lg hover:shadow-xl border border-gray-100 hover:border-blue-200"
                      }`}>
                        
                        {/* Card Header */}
                        <div className="text-center mb-8">
                          <div className={`inline-flex p-3 rounded-2xl mb-4 ${
                            isFree ? "bg-green-100" :
                            isEnterprise ? "bg-purple-100" :
                            isPopular ? "bg-gradient-to-br from-blue-100 to-purple-100" :
                            "bg-gray-100"
                          }`}>
                            {isFree ? (
                              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                              </svg>
                            ) : isEnterprise ? (
                              <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                              </svg>
                            ) : (
                              <svg className={`w-8 h-8 ${isPopular ? "text-blue-600" : "text-gray-600"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                              </svg>
                            )}
                          </div>
                          
                          <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.title}</h3>
                          <p className="text-gray-600 text-sm">{plan.subtitle}</p>
                        </div>

                        {/* Price */}
                        <div className="text-center mb-8">
                          {isFree ? (
                            <div className="text-5xl font-bold text-gray-900 mb-2">Free</div>
                          ) : isEnterprise ? (
                            <div className="text-4xl font-bold text-gray-900 mb-2">Let's Talk</div>
                          ) : (
                            <div className="mb-2">
                              <div className="flex items-baseline justify-center">
                                <span className="text-2xl font-semibold text-gray-500">{plan.currency}</span>
                                <span className="text-5xl font-bold text-gray-900">{plan.price.toLocaleString()}</span>
                              </div>
                              {plan.usd_price && (
                                <div className="text-sm text-gray-500 mt-1">{plan.usd_price} USD</div>
                              )}
                            </div>
                          )}
                          {!isEnterprise && (
                            <div className="text-gray-500 text-sm">per month</div>
                          )}
                        </div>

                        {/* Features */}
                        <div className="space-y-4 mb-8 flex-grow">
                          {plan.features.map((feature, idx) => (
                            <div key={idx} className="flex items-start">
                              <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5 mr-3 ${
                                isPopular ? "bg-blue-100" : "bg-green-100"
                              }`}>
                                <svg className={`w-3 h-3 ${isPopular ? "text-blue-600" : "text-green-600"}`} fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              </div>
                              <span className="text-gray-700 text-sm leading-relaxed">{feature}</span>
                            </div>
                          ))}
                        </div>

                        {/* CTA Button */}
                        <Link
                          href={plan.button.link}
                          className={`block w-full py-4 px-6 rounded-2xl font-semibold text-center transition-all duration-300 transform hover:scale-105 ${
                            isPopular
                              ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-purple-700"
                              : isFree
                              ? "bg-green-600 text-white hover:bg-green-700 shadow-lg hover:shadow-xl"
                              : isEnterprise
                              ? "bg-purple-600 text-white hover:bg-purple-700 shadow-lg hover:shadow-xl"
                              : "bg-gray-900 text-white hover:bg-gray-800 shadow-lg hover:shadow-xl"
                          }`}
                        >
                          {plan.button.label}
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Bottom Section */}
          <div className="mt-20 text-center">
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Trusted by developers worldwide</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
                <div className="flex items-center justify-center space-x-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-gray-900">99.9% Uptime</div>
                    <div className="text-gray-600">Guaranteed SLA</div>
                  </div>
                </div>
                <div className="flex items-center justify-center space-x-3">
                  <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-gray-900">Lightning Fast</div>
                    <div className="text-gray-600">&lt; 200ms response time</div>
                  </div>
                </div>
                <div className="flex items-center justify-center space-x-3">
                  <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-gray-900">24/7 Support</div>
                    <div className="text-gray-600">Always here to help</div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 pt-8 border-t border-gray-200">
                <p className="text-gray-600 mb-4">Need a custom solution or have questions?</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/contact" className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors font-medium">
                    Contact Sales
                  </Link>
                  <Link href="/docs" className="px-6 py-3 text-blue-600 hover:text-blue-700 transition-colors font-medium">
                    View Documentation →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Cta cta={call_to_action} />
    </>
  );
}

export default Pricing;
